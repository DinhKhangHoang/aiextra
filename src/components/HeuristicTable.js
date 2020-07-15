import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import "./HeuristicTable.css";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...props.heuristics];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");
        props.setHeuristicValues(newData);
      } else {
        newData.push(row);
        setEditingKey("");
        props.setHeuristicValues(newData);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Points",
      dataIndex: "points",
      width: "30%",
      editable: false,
      render: (value) => `from ${value} to ${props.goal}`,
    },
    {
      title: "Heuristic",
      dataIndex: "value",
      width: "35%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      width: "35%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
              color="link"
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button color="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button
            color="link"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "value" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="CardHeuristic">
      <Card>
        <CardBody>
          <Row>
            <Col xs="11">
              <CardTitle className="h3 font-weight-bold">
                Edit heuristic values
              </CardTitle>
            </Col>
            <Col>
              <Button close color="danger" outline onClick={props.closeEdit} />
            </Col>
          </Row>
          <Row>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={props.heuristics}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
                scroll={{ y: 400 }}
              />
            </Form>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditableTable;
