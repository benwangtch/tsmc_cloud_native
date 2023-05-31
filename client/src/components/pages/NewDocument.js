import { Container, Header, Form } from 'semantic-ui-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewDocument = () => {
  const navigate = useNavigate();
  const [document, setDocument] = useState({
    title: '',
    content: '',
    type: 'private',
  });

  const { title, content, type } = document;

  const onChange = e =>
    setDocument({ ...document, [e.target.name]: e.target.value });

  const typeOnChange = (e, { value }) => {
    setDocument({ ...document, type: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/documents', document);
      const id = res.data._id;
      // Add history record
      await axios.post('/api/histories', {
        documentId: id,
        title: document.title,
        content: document.content,
        operation: 'Add',
      });

      setDocument({
        title: '',
        content: '',
        type: 'private',
      });

      navigate(`/document/${id}`, { replace: true });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    // <form onSubmit={onSubmit}>
    //   <h2 className='text-primary'>Add Document</h2>
    //   <input
    //     type='text'
    //     placeholder='Title'
    //     name='title'
    //     value={title}
    //     onChange={onChange}
    //     required
    //   />
    //   <input
    //     type='text'
    //     placeholder='Content'
    //     name='content'
    //     value={content}
    //     onChange={onChange}
    //     required
    //   />
    //   <h5>Document Type</h5>
    //   <input
    //     type='radio'
    //     name='type'
    //     value='private'
    //     checked={type === 'private'}
    //     onChange={onChange}
    //   />{' '}
    //   Private{' '}
    //   <input
    //     type='radio'
    //     name='type'
    //     value='shared'
    //     checked={type === 'shared'}
    //     onChange={onChange}
    //   />{' '}
    //   Shared
    //   <div>
    //     <input
    //       type='submit'
    //       value='Add Document'
    //       className='btn btn-primary btn-block'
    //     />
    //   </div>
    // </form>

    <Container>
      <div>
        <Header as='h1'>New Post</Header>
      </div>
      <Form onSubmit={onSubmit}>
        {/* <Form.Input
          type='file'
          width={6}
          id='post-image'
          style={{ display: 'None' }}
          onChange={e => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        /> */}
        <Form.Input
          type='text'
          placeholder='文章標題'
          name='title'
          value={title}
          onChange={onChange}
          required
        />
        <Form.TextArea
          type='text'
          placeholder='文章內容'
          name='content'
          value={content}
          onChange={onChange}
          rows={30}
          required
        />
        <Form.Group inline>
          <label>Document Type</label>
          <Form.Radio
            label='private'
            value='private'
            name='type'
            checked={type === 'private'}
            onChange={typeOnChange}
          />
          <Form.Radio
            label='shared'
            value='shared'
            name='type'
            checked={type === 'shared'}
            onChange={typeOnChange}
          />
        </Form.Group>
        <Form.Button type='submit' value='Add Document'>
          發布文章
        </Form.Button>
        {/* <Form.Dropdown
          placeholder='文章分類'
          options={options}
          value={topicName}
          onChange={(e, { value }) => setTopicName(value)}
          selection
        />
        <div>
          <Button as='label' htmlFor='post-image' basic>
            上傳圖片
          </Button>
          <Button loading={isloading}>發布文章</Button>
        </div> */}
        {/* <div>
          <Button type='submit' value='Add Document'>
            Submit
          </Button>
        </div> */}
        {/* <div>
        <Form.Button loading={isloading}>Submit</Form.Button>
        <Form.Button basic as="label" htmlFor="post-image">
          上傳檔案
        </Form.Button>
      </div> */}
      </Form>
    </Container>
  );
};

export default NewDocument;
