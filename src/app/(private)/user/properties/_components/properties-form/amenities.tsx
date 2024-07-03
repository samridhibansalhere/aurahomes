import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Input, Select, InputNumber, Form } from "antd";
import { facingTypes, parkingTypes, furnishingTypes } from "@/constants";

function Amenities({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, amenities: values });
    setCurrentStep(currentStep + 1);
  };

  // bedrooms , bathrooms , balconies , parking , furnishing , area , totalFloors ,facing , age
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={finalValues.amenities}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="bedrooms"
          label="Bedrooms"
          rules={[
            {
              required: true,
              message: "Please input bedrooms!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Washrooms" />
        </Form.Item>
        <Form.Item
          name="bathrooms"
          label="Washrooms"
          rules={[
            {
              required: true,
              message: "Please input Washrooms!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Bathrooms" />
        </Form.Item>
        <Form.Item
          name="balconies"
          label="Balconies"
          rules={[
            {
              required: true,
              message: "Please input balconies!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Balconies" />
        </Form.Item>
        <Form.Item
          name="parking"
          label="Parking"
          rules={[
            {
              required: true,
              message: "Please input parking!",
            },
          ]}
        >
          <Select options={parkingTypes} />
        </Form.Item>
        <Form.Item
          name="furnishing"
          label="Furnishing"
          rules={[
            {
              required: true,
              message: "Please input furnishing!",
            },
          ]}
        >
          <Select options={furnishingTypes} />
        </Form.Item>
        <Form.Item
          name="floors"
          label="Floors"
          rules={[
            {
              required: true,
              message: "Please input furnishing!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Floors" />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area (in square meters)"
          rules={[
            {
              required: true,
              message: "Please input area!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Area" />
        </Form.Item>
        <Form.Item
          name="facing"
          label="Facing"
          rules={[
            {
              required: true,
              message: "Please input facing!",
            },
          ]}
        >
          <Select options={facingTypes} />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age (in years)"
          rules={[
            {
              required: true,
              message: "Please input age!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Age" />
        </Form.Item>
      </div>

      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Amenities;