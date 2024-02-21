import { AuthAPI } from "@ai-grader/apis";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

enum UserRole {
  Teacher = 1,
  Header
}

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: any) {
    setSubmitting(true);
    const res = await AuthAPI.register(e);
    console.log(res);
    setSubmitting(false);
  }

  return (
    <Form size="large" onFinish={handleSubmit}>
      <div className="flex gap-sm">
        <Form.Item name="type" className="w-30">
          <Select
            placeholder="身份"
            defaultValue={UserRole.Teacher}
            options={[
              { value: UserRole.Teacher, label: "普通教师" },
              { value: UserRole.Header, label: "学科组长" },
            ]}
          />
        </Form.Item>
        <Form.Item name="username" className="flex-auto">
          <Input placeholder="教职工账号" />
        </Form.Item>
      </div>
      <Form.Item name="password">
        <Input.Password placeholder="密码" autoComplete="password" />
      </Form.Item>
      <Form.Item name="re-password">
        <Input.Password placeholder="确认密码" autoComplete="re-password" />
      </Form.Item>
      <Button
        type="primary"
        loading={submitting}
        block
        htmlType="submit"
      >注册</Button>
    </Form>
  );
}