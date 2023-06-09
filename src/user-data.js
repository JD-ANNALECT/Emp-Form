import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";

export class Userdata extends LitElement {
  static get properties() {
    return {
      savedData: { type: Array },
      index: { type: Number },
      savedName: { type: String },
      savedEmpCode: { type: String },
      savedEmail: { type: String },
      savedDesignation: { type: String },
      savedDepartment: { type: String },
      ascending: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.savedData = JSON.parse(localStorage.getItem("myFormData")) || [];
    this.index = -1;
    this.savedName = "";
    this.savedEmpCode = "";
    this.ascending = false;
    console.log(this.savedData);
  }
  render() {
    return html`
      <button class="btn-sort" @click=${this.sortitem}>
        <img src="src/assets/sort.png" id="slogo" /><span
          class="tooltip-text"
          id="top"
          >Sort</span
        >
      </button>
      ${repeat(
        this.savedData,
        (item, index) => html`
          <div class="wrapper">
            <div class="container">
              <div class="box">
                <span class="heade">${item.name}</span>
                <p><strong>Emp code-</strong> ${item.empCode}</p>
                <p><strong>Email-</strong>${item.email}</p>
                <p><strong>Phone-</strong>${item.phone}</p>
                <p><strong>Designation-</strong>${item.designation}</p>
                <p><strong>Department-</strong>${item.department}</p>
                <p><strong>Address-</strong>${item.address}</p>
                <p>Address-${item.address1}</p>
                <p><strong>Landmark-</strong>${item.landmark}</p>
                <p><strong>Country-</strong>${item.country}</p>
                <p><strong>State-</strong>${item.state}</p>
                <p><strong>City-</strong>${item.city}</p>
                <p><strong>Zip Code-</strong>${item.zipcode}</p>
                <div class="btn-holder">
                  <button
                    class="btn-update"
                    @click=${() => this.updateitem(index)}
                  >
                    Update
                  </button>
                  <button
                    class="btn-delete"
                    @click=${() => this.deletecondition(index)}
                  >
                    &#10006
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
      )}

      <dialog id="popUpForm">
        <div class="container1">
          <header class="header">
            <h2>Update Data</h2>
          </header>
          <form method="dialog" class="form">
            <div class="form-control">
              <label for="name">Name</label>
              <input
                spellcheck="false"
                autocomplete="off"
                type="text"
                id="name"
                disabled
                value=${this.savedName}
              />
            </div>
            <div class="form-control">
              <label for="empCode">Emp Code</label>
              <input
                spellcheck="false"
                autocomplete="off"
                type="text"
                id="empCode"
                disabled
                value=${this.savedEmpCode}
              />
            </div>
            <div class="form-control">
              <label for="email">Email</label>
              <input
                spellcheck="false"
                autocomplete="off"
                type="email"
                id="email"
                value=${this.savedEmail}
              />
            </div>
            <div class="form-control">
              <label for="desgination">Designation</label>
              <input
                type="text"
                id="designation"
                value=${this.savedDesignation}
                autocomplete="off"
                spellcheck="false"
              />
            </div>
            <div class="form-control">
              <label for="departement">Department</label>
              <input
                type="text"
                id="department"
                value=${this.savedDepartment}
                autocomplete="off"
                spellcheck="false"
              />
            </div>
            <button class="btn" @click=${this.updateData} type="submit">
              Update
            </button>
            <button class="btn" @click=${this.cancelData}>Cancel</button>
          </form>
        </div>
      </dialog>
    `;
  }
  sortitem() {
    this.ascending = !this.ascending;
    const multiplier = this.ascending ? 1 : -1;
    this.savedData.sort((x, y) => {
      const name1 = x.name.toLowerCase();
      const name2 = y.name.toLowerCase();
      if (name1 < name2) {
        return -1 * multiplier;
      }
      if (name1 > name2) {
        return 1 * multiplier;
      }
    });
    this.requestUpdate();
  }

  updateitem(index) {
    this.index = index;
    const items = this.savedData[index];
    this.savedName = items.name;
    this.savedEmpCode = items.empCode;
    this.savedEmail = items.email;
    this.savedDesignation = items.designation;
    this.savedDepartment = items.department;
    this.popUpForm();
  }
  popUpForm() {
    const popUp = this.renderRoot.querySelector("#popUpForm");
    popUp.showModal();
  }

  updateData(e) {
    e.preventDefault();
    const UpdatedName = this.shadowRoot.querySelector("#name").value;
    const UpdatedEmpCode = this.shadowRoot.querySelector("#empCode").value;
    const UpdatedEmail = this.shadowRoot.querySelector("#email").value;
    if (UpdatedName && UpdatedEmpCode) {
      const items = this.savedData[this.index];
      items.name = UpdatedName;
      items.empCode = UpdatedEmpCode;
      items.email = UpdatedEmail;
      localStorage.setItem("myFormData", JSON.stringify(this.savedData));
      window.location.reload();
      this.requestUpdate();
    }
  }

  cancelData() {
    window.location.reload();
  }

  deletecondition(index) {
    if (confirm("Are you sure you want to delete")) {
      this.deleteitem(index);
    }
  }
  deleteitem(index) {
    this.savedData.splice(index, 1);
    localStorage.setItem("myFormData", JSON.stringify(this.savedData));
    window.location.reload();
    this.requestUpdate();
  }
  static get styles() {
    return css`
      .wrapper {
        display: inline-flex;
      }
      .box {
        width: 307px;
        height: 425px;
        background-color: #fff;
        border-radius: 5px;
        padding: 60px;
        margin: 10px;
        letter-spacing: 1px;
        padding-top: 80px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        position: relative;
        z-index: 0;
      }
      .box h3 {
        font-size: 35px;
        padding: 20px 0;
        color: #444;
      }
      .box p {
        font-size: 15px;
        color: #777;
        font-family: "mulish", sans-serif;
        display: flex;
        margin-left: -50px;
      }
      .btn-update {
        width: 100%;
        height: 40px;
        background-color: #333;
        color: #fff;
        border: none;
        outline: none;
        font-size: 17px;
        border-radius: 50px;
        margin-top: 45px;
        cursor: pointer;
        margin-left: 0px;
      }
      .btn-update:hover {
        letter-spacing: 2px;
        opacity: 0.8;
      }
      .btn-delete {
        background:none;
        border: none;
        border-radius:50px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .box::before {
        width: 100%;
        height: 100%;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
      .box::after {
        width: 100%;
        height: 100%;
        background-color: #fbda61;
        background-image: linear-gradient(45deg, #f0c119 0%, #010380 100%);
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
        clip-path: circle(40% at 80% -13%);
        transition: 0.5s;
      }
      .heade {
        position: absolute;
        top: 15px;
        right: 30px;
        font-size: 30px;
        font-weight: bolder;
        color: #fff;
        font-family: "Montserrat", sans-serif;
      }
      .box:hover:after {
        clip-path: circle(100%);
      }
      .box:hover h3 {
        color: #fff;
      }
      .box:hover p {
        color: #fff;
      }
      .box:hover .btn-update {
        color: #333;
        background-color: #fff;
      }
      .box:hover .btn-delete {
        color: #333;
        background-color: #fff;
      }
      .box:hover ::before {
        background-color: rgba(0, 0, 0, 0.1);
      }
      .btn-holder {
        display: block;
        margin-top: -40px;
      }
      .btn-sort {
        position: absolute;
        top: 17px;
        right: 10px;
        outline: none;
        border: none;
        background-color: #0c0120;
      }
      #slogo {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .tooltip-text {
        font-size: 15px;
        position: absolute;
        right: 10%;
        top: 84%;
        color: #fff;
        border: 1px solid #0033ff;
        padding: 3px;
        background: #0033ff;
        visibility: hidden;
      }
      .btn-sort:hover .tooltip-text {
        visibility: visible;
      }
      .out{
        width: 100%;
        filter: blur(8px);
       -webkit-filter: blur(8px);
      }
      #popUpForm {
        border:none;
        outline: none;
        width: 400px;
        height: 480px;
        border-radius:10px;
        -webkit-border-radius:10px;
      }
      #popUpForm::backdrop {
        background:#0b23a9;
        opacity:0.6;
      }
      .header h2{
      color:#222;
      font-family: 'Montserrat', sans-serif;
      font-size:20px;
      text-transform:uppercase;
      text-align:center;
    } 
    .header {
      background:linear-gradient(to left,#74ebd5,	#9face6);
      padding:2px;
    }
    .container1{
      background-color: #fff;
     border-radius:10px;
     -webkit-border-radius:10px;
     overflow:hidden;
     width:100%;
     box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12. ;
     background:#e9f6f4;
     position:absolute;
     top:0px;
     right:0px;
    }
    .form{
      padding: 20px;
    }
    .form-control label{
      display:block;
      margin-bottom:2px;
      font-weight:bold;
      font-family: 'Mulish', sans-serif;
      font-size:15px;
    }
    .form-control input{
      width:90%;
      height:5px;
      border:2px solid #f0f0f0
      border-radius:5px;
      display:block;
      font-family: 'Mulish', sans-serif;
      font-size:12px;
      padding:12px;
    }
    .form-control input:focus{
      outline:0;
      border-color:#777
    }
    .form .btn {
      background:linear-gradient(to left,#74ebd5,	#9face6);
      border-radius:6px;
      border:none;
      outline:none;
      font-size:16px;
      padding:15px 0;
      margin-top:20px;
      width:97.5%;
      font-weight:bold;
      text-transform:uppercase;
      cursor:pointer;
      color:#000000;
      transition:all 1s ease;
    }
    .form .btn:hover{
      background:linear-gradient(to right,#74ebd5,	#9face6);
    }
    `;
  }
}
window.customElements.define("user-data", Userdata);
