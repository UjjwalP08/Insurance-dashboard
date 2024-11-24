// import Eye from "../../asset/image/eye.png";
// import { Button, Image, Input, Popconfirm, Switch } from "antd";
import { Button, Image, Popconfirm } from "antd";
import {
  DeleteOutlined,
  // DownloadOutlined,
  EditOutlined,
  // EyeOutlined,
  // CheckCircleTwoTone,
  // CloseCircleTwoTone,
} from "@ant-design/icons";
// import logo from "../../asset/logos/logo2.png";

// const alphanumericSort = (a, b, value) => {
//   if (isNaN(parseInt(a[value]))) {
//     return a[value]?.localeCompare(b[value]);
//   }
//   return a[value] - b[value];
// };

// const RenderActionButtons = (value) => {
//   let ButtonsArray = [];
//   if (value?.Delete) {
//     ButtonsArray.push(RenderDeleteButton(value.Delete));
//   }
//   if (value?.Edit) {
//     ButtonsArray.push(RenderEditButton(value.Edit));
//   }
//   if (value?.View) {
//     ButtonsArray.push(RenderViewButton(value.View));
//   }
//   if (value?.Download) {
//     ButtonsArray.push(RenderDownloadButton(value.Download));
//   }
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-around",
//         // paddingRight: "5px",
//       }}
//     >
//       {ButtonsArray?.map((el, i) => (
//         <div key={i}>{el}</div>
//       ))}
//     </div>
//   );
// };

// Delete Button
const RenderDeleteButton = (value) => {
  // console.log(value, 'constant');
  const { id, onClick } = value;
  return (
    <Popconfirm title="Sure to Delete?" onConfirm={() => onClick(id)}>
      <Button type="primary">
        {value?.name ? value?.name : <DeleteOutlined />}
      </Button>
      {/* <Button type="primary">{value?.name}</Button> */}
    </Popconfirm>
  );
};

// Delete button without confimation model
// const RenderDeleteWithoutConfirmation = (value) => {
//   return (
//     <Popconfirm
//       title="Sure to Delete?"
//       open={false}
//       onOpenChange={() => value?.onClick(value.key)}
//       onConfirm={() => value?.onClick(value.key)}
//     >
//       {value?.name ? (
//         value?.name
//       ) : (
//         <DeleteOutlined style={{ color: "black" }} />
//       )}
//     </Popconfirm>
//   );
// };
// // Download Button
// const RenderDownloadButton = (value) => {
//   return (
//     <DownloadOutlined
//       onClick={() => {
//         window.open(value, "Download");
//       }}
//     />
//   );
// };

// Edit Button
const RenderEditButton = (value = {}) => {
  const { id, onClick } = value;
  return (
    <Button
      type="primary"
      onClick={() => {
        onClick(id);
      }}
    >
      <EditOutlined />
    </Button>
  );
};

// // View Image Button
// const RenderViewImageButton = (value) => {
//   return (
//     <Image
//       width={20}
//       src={Eye}
//       className="pointer"
//       preview={{
//         mask: false,
//         src: value,
//       }}
//     />
//   );
// };

// // Render Accept and Reject Button
// const RenderAcceptRejectButton = (value) => {
//   const { id, onAccept, onReject } = value;

//   return (
//     <div>
//       <Popconfirm
//         placement="top"
//         title={"Are you sure to Accept this request?"}
//         // description={description}
//         onConfirm={() => {
//           onAccept(id);
//         }}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button style={{ backgroundColor: "#52c41a" }}>
//           <CheckCircleTwoTone twoToneColor="#52c41a" />
//         </Button>
//       </Popconfirm>
//       <Popconfirm
//         placement="top"
//         title={"Are you sure to Reject this request?"}
//         // description={description}
//         onConfirm={() => {
//           onReject(id);
//         }}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button className="ml-2 bg-red-600">
//           <CloseCircleTwoTone twoToneColor="#dc2626" />
//         </Button>
//       </Popconfirm>
//     </div>
//   );
// };

// // Render View Button
// const RenderViewButton = (value) => {
//   const { id, onClick } = value;
//   return (
//     <Button
//       onClick={() => {
//         onClick(id);
//       }}
//       type="primary"
//     >
//       <EyeOutlined
//         onClick={() => {
//           onClick(id);
//         }}
//       />
//     </Button>
//   );
// };

// // Render Images
const ImageRanders = (value) => {
  let imageSrc = value;
  // if (!imageSrc) {
  //   imageSrc = logo;
  // }
  return (
    <div>
      <Image
        width={50}
        height={50}
        className="rounded-full object-cover"
        src={imageSrc}
        alt={value}
      />
    </div>
  );
};
// const BannerRanders = (value) => {
//   let imageSrc = value;
//   if (!imageSrc) {
//     imageSrc = logo;
//   }
//   return (
//     <div>
//       <Image
//         width={200}
//         height={80}
//         className="rounded-md object-cover"
//         src={imageSrc}
//         alt={value}
//       />
//     </div>
//   );
// };

// // Toggle Button
// const RenderToggleButton = (value) => {
//   const { checked, id, onClick } = value;
//   return (
//     <div>
//       <Switch
//         onChange={() => {
//           onClick(id, checked);
//         }}
//         checked={!checked}
//       />
//     </div>
//   );
// };

// Checkbox render
// const RenderCheckbox = (value) => {
//   const { checked, id, onClick } = value;
//   return (
//     <div>
//       <Input
//         type="checkbox"
//         checked={!checked}
//         onChange={() => {
//           onClick(id, checked);
//         }}
//       />
//     </div>
//   );
// };

export const loginRoot = "/";
export const appRoot = "/app";


const CONSTANTS = {
  // BASE_URL: "http://20.244.39.211/api/v1",
  GETMe: null,
  TABLE: {
    REQUEST: [
      {
        title: "No.",
        dataIndex: "no",
        width: 100,
      },

      {
        title: "Donor Name",
        dataIndex: "donorName",
        width: 120,
      },
      {
        title: "Donor Email",
        dataIndex: "donarEmail",
        width: 120,
      },
      {
        title: "Donor Mobile",
        dataIndex: "donarMobile",
        width: 120,
      },
      {
        title: "PickUp Address",
        dataIndex: "pickUpAddress",
        width: 120,
      },
      {
        title: "Food Category",
        dataIndex: "foodCategory",
        width: 120,
      },
      {
        title: "Food Quantity (KG)",
        dataIndex: "foodQuantity",
        width: 120,
      },
      {
        title: "Preparation Date & Time",
        dataIndex: "dateTime",
        width: 120,
      },



      {
        title: "Action",
        dataIndex: "deleteTableRow",
        render: RenderDeleteButton,
        width: 80,
      },


    ],
    DELIVERY_PERSON: [
      {
        title: "No.",
        dataIndex: "no",
        width: 100,
      },

      {
        title: "Name",
        dataIndex: "name",
        width: 120,
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 120,
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        width: 120,
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        width: 120,
      },
      {
        title: "End Time",
        dataIndex: "endTime",
        width: 120,
      },

      {
        title: "Edit",
        dataIndex: "editTableRow",
        render: RenderEditButton,
        width: 80,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Action",
        dataIndex: "deleteTableRow",
        render: RenderDeleteButton,
        width: 80,
      },


    ],
    BILL_LIST: [
      {
        title: "No.",
        dataIndex: "no",
        width: 100,
      },

      {
        title: "Bill No.",
        dataIndex: "billNo",
        width: 120,
      },
      {
        title: "Billing Date",
        dataIndex: "billingDate",
        width: 120,
      },
      {
        title: "Bill Amount",
        dataIndex: "amount",
        width: 120,
      },
      {
        title: "Bill",
        dataIndex: "billImage",
        render: ImageRanders,
        width: 120,
      },


      {
        title: "Edit",
        dataIndex: "editTableRow",
        render: RenderEditButton,
        width: 80,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Action",
        dataIndex: "deleteTableRow",
        render: RenderDeleteButton,
        width: 80,
      },


    ],
    INQUIRY: [
      {
        title: "No.",
        dataIndex: "no",
        width: 100,
      },

      {
        title: "Name",
        dataIndex: "name",
        width: 120,
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 120,
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        width: 120,
      },
      {
        title: "Message",
        dataIndex: "message",
        width: 120,
      },

      {
        title: "Action",
        dataIndex: "deleteTableRow",
        render: RenderDeleteButton,
        width: 80,
      },


    ],

  },
  FORM_FIELD: {
    LOGIN_PAGE_MODAL: [
      {
        no: 1,
        // Label: "User Name",
        name: "name",
        id: "name",
        type: "text",
        placeholder: "User name",
        required: true,
        width: 24,
      },
      {
        no: 1,
        // Label: "Password",
        name: "password",
        width: 24,
        id: "password",
        type: "password",
        placeholder: "Password",
        required: true,
      },
    ],
    DELIVERY_PERSON_MODAL: [
      {
        no: 1,
        Label: "Delivery Person Name",
        name: "name",
        id: "name",
        type: "text",
        placeholder: "Enter a Delivery Person Name",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 2,
        Label: "Email",
        name: "email",
        id: "email",
        type: "email",
        placeholder: "Enter a Email",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 3,
        Label: "Mobile",
        name: "mobile",
        id: "mobile",
        type: "mobile",
        placeholder: "Enter a Mobile",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 4,
        Label: "Start Time",
        name: "startTime",
        id: "startTime",
        type: "time",
        placeholder: "Enter a Start Time",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 5,
        Label: "End Time",
        name: "endTime",
        id: "endTime",
        type: "time",
        placeholder: "Enter a End Time",
        required: true,
        width: 12,
        labelwidth: 24,
      },



    ],
    BILL_MODAL: [
      {
        no: 1,
        Label: "Bill No.",
        name: "billNo",
        id: "billNo",
        type: "text",
        placeholder: "Enter a Bill No",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 2,
        Label: "Billing Date",
        name: "billingDate",
        id: "billingDate",
        type: "date",
        format: "DD/MM/YYYY",
        placeholder: "Select Billing Date",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 3,
        Label: "Amount",
        name: "amount",
        id: "amount",
        type: "number",
        placeholder: "Enter a Amount",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 4,
        Label: "Bill Image",
        name: "billImage",
        id: "billImage",
        type: "file",
        placeholder: "",
        required: true,
        width: 12,
        labelwidth: 24,
      },




    ],
    EDIT_BILL_MODAL: [
      {
        no: 1,
        Label: "Bill No.",
        name: "billNo",
        id: "billNo",
        type: "text",
        placeholder: "Enter a Bill No",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 2,
        Label: "Billing Date",
        name: "billingDate",
        id: "billingDate",
        type: "date",
        format: "DD/MM/YYYY",
        placeholder: "Select Billing Date",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 3,
        Label: "Amount",
        name: "amount",
        id: "amount",
        type: "number",
        placeholder: "Enter a Amount",
        required: true,
        width: 12,
        labelwidth: 24,
      },
      {
        no: 4,
        Label: "Bill Image",
        name: "billImage",
        id: "billImage",
        type: "file",
        placeholder: "",
        required: false,
        width: 12,
        labelwidth: 24,
      },




    ],


  },

  API: {
    login: {
      type: "POST",
      endpoint: "/user/login",
    },
    getMe: {
      type: "GET",
      endpoint: "/user/getMe",
    },



    // Request Api
    request: {
      getAll: {
        type: "GET",
        endpoint: "/admin/request",
      },

      delete: {
        type: "DELETE",
        endpoint: "/admin/request/",
      },
    },

    // Delivery Person Api
    delivery_person: {
      getAll: {
        type: "GET",
        endpoint: "/admin/delivery-person",
      },
      add: {
        type: "POST",
        endpoint: "/admin/delivery-person",
      },
      update: {
        type: "PATCH",
        endpoint: "/admin/delivery-person/",
      },
      delete: {
        type: "DELETE",
        endpoint: "/admin/delivery-person/",
      },
    },
    // Delivery Person Api
    delivery_person: {
      getAll: {
        type: "GET",
        endpoint: "/admin/delivery-person",
      },
      add: {
        type: "POST",
        endpoint: "/admin/delivery-person",
      },
      update: {
        type: "PATCH",
        endpoint: "/admin/delivery-person/",
      },
      delete: {
        type: "DELETE",
        endpoint: "/admin/delivery-person/",
      },
    },
    // Bill Api
    BILL: {
      getAll: {
        type: "GET",
        endpoint: "/user/bills",
      },
      add: {
        type: "POST",
        endpoint: "/user/bills",
      },
      update: {
        type: "PATCH",
        endpoint: "/user/bills/",
      },
      delete: {
        type: "DELETE",
        endpoint: "/user/bills/",
      },
    },

    // Inquiry Api
    inquiry: {
      getAll: {
        type: "GET",
        endpoint: "/admin/inquiry",
      },

      delete: {
        type: "DELETE",
        endpoint: "/admin/inquiry/",
      },
    },




  },

  TAB_MENU: {

  },
};
export default CONSTANTS;
