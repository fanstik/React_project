import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import ReactQuill from 'react-quill'
  import 'react-quill/dist/quill.snow.css'
  import { Link, useSearchParams } from 'react-router-dom'
  import { 
    getArticleByIdAPI,
    postArticleAPI,
    putArticleAPI
 } from '@/apis/article'
  import './index.scss'
import {  useEffect, useRef, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'

  
  const { Option } = Select
  
  const Publish = () => {
  // const [form] = Form.useForm();
  const {channelList} = useChannel();
    //上传图片
    const cacheImageList = useRef([]);
    const [imageList, setImageList] = useState([]);
    const onUploadChange = (info) => {
        console.log(info);
        setImageList(info.fileList);
        cacheImageList.current = info.fileList;
    }

    //切换图片
    const [imageType, setImageType] = useState(1);
    const onTypeChange = (e) => {
        const type = e.target.value;
        setImageType(type);
        if (type === 1) {
            const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : [];
            setImageList(imgList)
        } else if(type === 3){
            setImageList(cacheImageList.current);
        }
    }

    //提交表单
    const onFinish = (formData) => {
      // console.log(formData);
      if (imageType !== imageList.length) {
          return message.warning('图片类型与数量不一致');
      }
      const {channel_id,content,title} = formData;
      const params = {
          title,
          content,
          cover: {
              type: imageType, 
              images: imageList.map(item => {
                console.log(item);
                if (item.response) {
                  return item.response.data.url;
                } else {
                  return item.url;
                }
              }) //图片列表
          },
          channel_id,
      }
      if (id) {
        putArticleAPI({...params,id:id});
      } else postArticleAPI(params);
      message.success('发布文章成功!');
      // setImageList([])
  }

  //回填数据
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id')
  //
  const [form] = Form.useForm();
  if (id) {
    
  }
  useEffect(() => {
    if (id) {
      //通过id获取数据
      async function getArticleDetail () {
        const res = await getArticleByIdAPI(id);
        const { cover, ...formValue } = res.data;
        //调用实例方法，完成数据回填
        form.setFieldsValue({...formValue,type:cover.type});
        //
        setImageType(cover.type);
        setImageList(cover.images.map(url => {return {url}})); 
      }
      getArticleDetail();
    }
  },[id,form])

    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: `${id}` ? '编辑文章' : '发布文章' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {
                    channelList.map((item) => {
                        return (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        )
                    })
                }
              </Select>
            </Form.Item>

            <Form.Item label="封面">
                <Form.Item name="type">
                    <Radio.Group onChange={onTypeChange}>
                    <Radio value={1}>单图</Radio>
                    <Radio value={3}>三图</Radio>
                    <Radio value={0}>无图</Radio>
                    </Radio.Group>
                </Form.Item>
                {imageType > 0 && <Upload
                    name='image'
                    listType="picture-card"
                    showUploadList
                    onChange={onUploadChange}
                    action={'http://geek.itheima.net/v1_0/upload'}
                    maxCount={imageType}
                    multiple={imageType>1}
                    fileList={imageList}
                >
                    <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                    </div>
                </Upload>}
            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                <ReactQuill
                className="publish-quill"
                theme="snow"
                placeholder="请输入文章内容"
                />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                    {id ? '修改文章' : '发布文章'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish