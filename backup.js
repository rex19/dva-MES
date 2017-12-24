<FormItem
  {...formItemLayout}
  label="模块"
  hasFeedback
>
  {getFieldDecorator('AddPlatformID', {
    initialValue: '1',
  })(
    <Select>
      <Option key={0} value='1'>模块1</Option>
    </Select>)}
</FormItem>

  <FormItem
    {...formItemLayout}
    label="状态"
  >
    <div>
      {getFieldDecorator('EditUserState', {
        initialValue: '1',
        rules: [
          {
            required: true, message: '请选择状态',
          },
        ],
      })(
        <Select>
          <Option key={0} value='0'>未激活</Option>
          <Option key={1} value='1'>激活</Option>
          <Option key={2} value='-1'>已删除</Option>
        </Select>
        )}
    </div>
  </FormItem>

  <FormItem
    {...formItemLayout}
    label="角色"
  >
    <div>
      {getFieldDecorator('AddRole', {
        initialValue: [],
      })(
        <Select
          mode="multiple"
          labelInValue
          style={{ width: '100%' }}
          placeholder="请选择"
        >
          <Option key={0} value={0}>角色1</Option>
          <Option key={1} value={1}>角色2</Option>
        </Select>
        )}
    </div>
  </FormItem>


