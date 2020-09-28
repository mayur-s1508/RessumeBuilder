import React from "react";
import MaterialTable from "material-table";

export default function BaseTable(props) {
  const { columns, data, save } = props;
  return (
    <MaterialTable
      title=""
      columns={columns}
      data={data}
      style={{ margin: "32px 9px" }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              save(false, [...dataUpdate], resolve);
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              save(false, [...dataDelete], resolve);
            }, 1000);
          }),
      }}
    />
  );
}
