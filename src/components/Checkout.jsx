import { useState } from "react";
import { DELIVERY_FEE, formatKip, provinces } from "../data.js";
// ↑ provinces and DELIVERY_FEE are ready for you to use in Checkpoints 2–3.

const emptyForm = {
  fullName:"",
  phone:"",
  email:"",
  province:"",
  delivery:"pickup",
  address:"",
  payment:"cash",
  notes:"",
  agree:false
}

function Checkout({ cart, total, onBack, onPlaceOrder }) {
  // ─────────────────────────────────────────────────────────────
  // CHECKPOINT 1 — controlled inputs
  //   • add ONE useState for the whole form: formData = { fullName: "", phone: "" }
  //   • write ONE handleChange that works for every field (use e.target.name)
  //   • make the two inputs below controlled: value + onChange
  //

const [formData, setFormData] = useState(emptyForm);
function handleChange(e) {
  const{value,name,type,checked} = e.target;
  setFormData(previousValue => ({
    ...previousValue,
    [name]: type === "checkbox" ? checked : value
  }));
  console.log("AFTER INPUT>>>>", formData);
}


  // CHECKPOINT 2 — add the other fields
  //   email, province (select), delivery (radio), address (only when
  //   delivery is "home"), payment (select), note (textarea), agree (checkbox)
  //
  // CHECKPOINT 3 — validation on submit
  //   write validate(formData) → returns an object of error messages,
  //   show each error under its field, and DON'T submit while there are errors
  //
  // CHECKPOINT 4 — success
  //   when valid, call onPlaceOrder(formData) — then finish OrderSummary.jsx
  // ─────────────────────────────────────────────────────────────

  function handleSubmit(e) {
    e.preventDefault();
    // TODO (Checkpoint 3 and 4)
  }

  // TODO (Checkpoint 2): make this depend on the chosen delivery option
  const deliveryFee = 0;
  const grandTotal = total + deliveryFee;

  return (
    <div className="checkout">
      <button type="button" className="back-link" onClick={onBack}>
        ← ກັບໄປຮ້ານ
      </button>
      <h2 className="checkout-title">ຂໍ້ມູນການສັ່ງຊື້ · Checkout</h2>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} noValidate className="form-card">
          <div className="field">
            <label htmlFor="fullName">ຊື່ ແລະ ນາມສະກຸນ *</label>
            {/* This input is NOT controlled yet — React doesn't know what's typed in it */}
            <input id="fullName" name="fullName" type="text"value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="field">
            <label htmlFor="phone">ເບີໂທ * <span className="hint">( ຕົວເລກເທົ່ານັ້ນ ເຊັ່ນ 02055512345 )</span></label>

            <input id="phone" name="phone" type="tel"
            value={formData.phone}
            onChange={handleChange} />
          </div>

          {/* Implement with Codex */}
          {/* TODO (Checkpoint 2): the other fields go here */}
          <div className="field">
            <label htmlFor="email">ອີເມວ <span className="hint">(ບໍ່ບັງຄັບ)</span></label>
            <input id="email" name="email" type="email"
            value={formData.email}
            onChange={handleChange} />
          </div>

          <div className="field">
            <label htmlFor="province">ແຂວງ*</label>
            <select
              id="province" 
              name="province" 
              value={formData.province} 
              onChange={handleChange}
            >
              <option value="">---ເລືອກແຂວງ---</option>
              {/* <option value="vte">ນະຄອນຫຼວງ</option>
              <option value="ps">ວຽງຈັນ</option>
              <option value="lpb">ຫຼວງນໍ້າທາ</option>
              <option value="atp">ອັດຕະປື</option> */}

              {provinces.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}

            </select>
           
          </div>

          <fieldset className="field">
            <legend>ການຮັບສິນຄ້າ</legend>
            <label class="choice">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={formData.delivery === "pickup"}
                onChange={handleChange}
              />
              ມາຮັບເອງທີ່ຮ້ານ (ຟຣີ)
            </label>

            <label class="choice">
              <input
                type="radio"
                name="delivery"
                value="home"
                checked={formData.delivery === "home"}
                onChange={handleChange}
              />
              ສົ່ງເຖິງບ້ານ (+{formatKip(DELIVERY_FEE)})
            </label>
          </fieldset>

          {formData.delivery === "home" && (
          <div className="field">
            <label htmlFor="address">ທີ່ຢູ່ * </label>

            <input id="address" name="address" type="text"
            value={formData.address}
            maxLength={10}
            onChange={handleChange} />
          </div>
          )}

          <div className="field">
            <label htmlFor="payment">ວິທີການຊຳລະ*</label>

            <select
              id="payment" 
              name="payment" 
              value={formData.payment} 
              onChange={handleChange}
            >
              <option value="cash">ເງິນສົດ</option>
              <option value="transfer">ໂອນຜ່ານທະນາຄານ</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="notes">
              ໝາຍເຫດ *
              <span className="hint">({formData.notes.length}/120)</span>
              </label>

            <textarea
              name="notes"
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              >

            </textarea>
          </div>

          <div className="field">
            <label className="choice" htmlFor="agree">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleChange}
              />  

              ຂ້ອຍຢືນຢັນວ່າຂໍ້ມູນຖືກຕ້ອງ *
              </label>
          </div>


          <button type="submit" className="submit-btn">ຢືນຢັນການສັ່ງຊື້</button>
        </form>

        <aside className="recap">
          <div className="cart-title">ສິ່ງທີ່ສັ່ງ</div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="emoji">{item.emoji}</span>
                <div className="info">
                  <div className="name">{item.name} × {item.qty}</div>
                  <div className="line">{formatKip(item.price * item.qty)}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="recap-row"><span>ສິນຄ້າ</span><span>{formatKip(total)}</span></div>
          <div className="recap-row"><span>ຄ່າສົ່ງ</span><span>{formatKip(deliveryFee)}</span></div>
          <div className="total">
            <span>ລວມທັງໝົດ</span>
            <b data-testid="grand-total">{formatKip(grandTotal)}</b>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;