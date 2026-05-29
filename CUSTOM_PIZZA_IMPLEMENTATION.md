# Custom Pizza Raw Material Stock Management - Implementation Guide

## Overview
This document explains the implementation of automatic raw material stock deduction when users create and order custom pizzas through the CustomPizza page. The stock decreases in real-time on the RawStockPage with socket events.

---

## 📋 What Was Implemented

### ✅ Feature 1: Custom Pizza Detection
- The system now distinguishes between **menu pizzas** (regular inventory items) and **custom pizzas** (built with raw materials)
- Detection method: Check for presence of `base`, `sauce`, and `cheese` fields in pizza object

### ✅ Feature 2: Raw Material Stock Validation & Deduction
- When a custom pizza order is placed, the system:
  1. Validates all raw materials exist in database (base, sauce, cheese, veggies)
  2. Validates sufficient stock for each material
  3. Deducts quantities from raw materials when order completes
  4. Sends socket events for low/out-of-stock alerts

### ✅ Feature 3: Real-Time Updates via Socket
- RawStockPage listens for socket events:
  - `lowRawMaterial` - Triggered when stock ≤ threshold
  - `outOfRawMaterial` - Triggered when stock = 0
- Updates UI immediately without page refresh

---

## 🔧 Modified Files

### Backend

#### 1. `server/controllers/orderController.js`
**Changes:**
- Added import: `import RawMaterial from "../models/RawMaterial.js"`
- Enhanced validation (Step 1) to handle both custom and menu pizzas
- Enhanced stock update (Step 3) to deduct from raw materials for custom pizzas
- Socket events emit `lowRawMaterial` and `outOfRawMaterial` for custom pizzas

**Key Logic:**
```javascript
const isCustom = item.base && item.sauce && item.cheese;

if (isCustom) {
  // Process raw materials
  const rawMaterials = [item.base, item.sauce, item.cheese, ...(item.veggies || [])];
  // Validate and deduct stock for each material
} else {
  // Process inventory items (existing logic)
}
```

#### 2. `server/controllers/rawMaterialController.js`
**Changes:**
- Enhanced `updateStock` function to emit proper socket events
- Added `lowRawMaterial` event emission when stock ≤ threshold
- Added `outOfRawMaterial` event emission when stock = 0

### Frontend

#### 1. `client/src/pages/RawStockPage.jsx`
**Changes:**
- Added socket listener for `lowRawMaterial` event
- Added socket listener for `outOfRawMaterial` event
- Updates local state when raw materials are consumed
- Shows alerts for low/out-of-stock warnings

#### 2. `client/src/pages/Cart.jsx` (No Changes Needed)
- Already sends correct payload with `base`, `sauce`, `cheese`, `veggies`
- Structure works perfectly for custom pizza detection

#### 3. `client/src/components/pizza/CustomPizzaBuilder.jsx` (No Changes Needed)
- Already generates proper pizza object structure
- Includes all necessary fields for order processing

---

## 📊 Data Flow

### User Creates Custom Pizza Order:

```
1. User selects: Base, Sauce, Cheese, Veggies on CustomPizza page
   ↓
2. Custom pizza added to cart with structure:
   {
     id: "generated-id",
     name: "Custom Pizza",
     base: "Thin Crust",
     sauce: "Tomato",
     cheese: "Mozzarella",
     veggies: ["Onion", "Mushroom"],
     price: 299,
     quantity: 1
   }
   ↓
3. User proceeds to Cart and places order
   ↓
4. Payment processed via Razorpay
   ↓
5. Order payload sent to /api/orders/create with custom pizza details
   ↓
6. Server validates raw materials have sufficient stock
   ↓
7. Order created and raw material stock is deducted
   ↓
8. Socket events emitted for low/out-of-stock alerts
   ↓
9. RawStockPage receives socket events and updates UI in real-time
```

---

## 🗄️ Database Requirements

### RawMaterial Schema
```javascript
{
  _id: ObjectId,
  name: String (unique, lowercase),  // e.g., "thin crust", "tomato", "mozzarella"
  stock: Number (≥ 0),
  unit: String (enum: "kg", "g", "L", "ml", "pcs", "pack", "bottle"),
  threshold: Number (≥ 0),
  timestamps: Boolean
}
```

**Important:** Raw material names must be stored in **lowercase** for proper matching during order processing.

### Sample Raw Materials to Create:
```javascript
// Bases
{ name: "thin crust", stock: 50, unit: "pcs", threshold: 5 }
{ name: "cheese burst", stock: 40, unit: "pcs", threshold: 5 }
{ name: "pan crust", stock: 30, unit: "pcs", threshold: 5 }

// Sauces
{ name: "tomato", stock: 100, unit: "L", threshold: 10 }
{ name: "spicy", stock: 80, unit: "L", threshold: 10 }

// Cheeses
{ name: "mozzarella", stock: 50, unit: "kg", threshold: 5 }
{ name: "cheddar", stock: 40, unit: "kg", threshold: 5 }

// Veggies
{ name: "onion", stock: 50, unit: "kg", threshold: 5 }
{ name: "mushroom", stock: 30, unit: "kg", threshold: 3 }
```

---

## 🔔 Socket Events

### Custom Pizza Related Events:

| Event | Triggered When | Payload |
|-------|---|----------|
| `lowRawMaterial` | Raw material stock ≤ threshold | `{_id, name, stock, threshold}` |
| `outOfRawMaterial` | Raw material stock = 0 | `{_id, name, stock}` |

### Menu Pizza Events (Existing):

| Event | Triggered When | Payload |
|-------|---|----------|
| `lowStock` | Inventory stock ≤ 5 | `{_id, name, stock}` |
| `outOfStock` | Inventory stock = 0 | `{_id, name, stock}` |

---

## 🔐 Transaction Safety

The implementation uses **MongoDB sessions** to ensure transaction safety:

1. Transaction starts when order processing begins
2. All validations happen within transaction
3. If any validation fails → transaction rolls back (no stock is deducted)
4. If all validations pass → stock is deducted and transaction commits
5. If any error occurs → transaction aborts automatically

This prevents:
- Duplicate stock deductions
- Partial updates
- Data inconsistency

---

## ⚠️ Error Handling

### Validation Errors:
- Raw material not found in database
- Insufficient raw material stock
- Invalid quantities

**Response:**
```javascript
{
  success: false,
  message: "Not enough tomato stock for custom pizza (need 2, have 1)"
}
```

Order will NOT be created if validation fails, and user receives clear error message.

---

## ✅ What Remains Unchanged

✔️ **Inventory Management for Menu Pizzas**
- Menu pizzas still use inventory stock
- No changes to existing logic
- Backward compatible

✔️ **Socket Events for Menu Pizzas**
- `lowStock` and `outOfStock` events still work
- Inventory pages still receive updates normally

✔️ **Order Model**
- Already has `base`, `sauce`, `cheese`, `veggies` fields
- No schema changes needed

✔️ **Cart Logic**
- Supports both menu and custom pizzas
- No changes to cart structure

---

## 🧪 Testing Checklist

### Basic Flow:
- [ ] Create raw materials in database
- [ ] Navigate to CustomPizza page
- [ ] Select base, sauce, cheese, veggies
- [ ] Add to cart
- [ ] Place order with payment
- [ ] Check RawStockPage - stock should decrease
- [ ] Verify socket event received and UI updated in real-time

### Edge Cases:
- [ ] Order with 1 custom pizza - verify correct deduction
- [ ] Order with multiple custom pizzas (same and different) - verify all deducted
- [ ] Order with mixed menu and custom pizzas - verify both systems work
- [ ] Low stock alert - verify when threshold reached
- [ ] Out of stock - verify when stock = 0
- [ ] Insufficient stock - verify error message and transaction rollback

### Integration:
- [ ] Menu pizzas still work normally
- [ ] Inventory page updates still work
- [ ] Payment flow unaffected
- [ ] Order history shows custom pizzas correctly

---

## 📱 User Experience

### Happy Path:
1. User creates custom pizza ✓
2. Adds to cart ✓
3. Places order with payment ✓
4. Gets success confirmation ✓
5. RawStockPage shows updated stock in real-time ✓

### Error Scenario:
1. User tries to order when raw material insufficient
2. Gets clear error: "Not enough [material] stock for custom pizza"
3. Can modify order and retry
4. No stock is deducted (transaction rollback)

---

## 🚀 Performance Considerations

- **Single database query per raw material** during validation
- **Batch updates** to reduce database hits
- **Session-based transactions** for data consistency
- **Socket events** for real-time updates (no polling)

---

## 📝 Future Enhancements

Potential improvements:
1. Raw material unit conversion (kg to g, etc.)
2. Bulk order discounts for custom pizzas
3. Raw material price calculation
4. Ingredient availability display on UI
5. Reservation system for trending ingredients

---

## 🆘 Troubleshooting

### Issue: Raw materials not decreasing
**Solution:**
1. Verify raw materials exist in database with exact lowercase names
2. Check order payload includes `base`, `sauce`, `cheese`
3. Check server logs for validation errors
4. Verify socket connection in RawStockPage

### Issue: Socket events not received
**Solution:**
1. Check socket.io connection logs
2. Verify RawStockPage is listening to correct event names
3. Check server is emitting events (console logs in controller)
4. Verify io instance is properly configured in server

### Issue: Stock goes negative
**Solution:**
1. This shouldn't happen due to validation
2. If it does, verify transaction safety in order controller
3. Check for race conditions with concurrent orders
4. Verify MongoDB session is being used

---

## 📞 Support

For issues or questions:
1. Check server logs: `npm run dev` in server folder
2. Check browser console: F12 → Console tab
3. Check socket.io connection: RawStockPage logs
4. Verify database entries: Check raw materials collection

---

**Implementation Complete! ✨**

The custom pizza raw material stock management system is now fully integrated and ready for use.
