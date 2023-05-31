import React, { useEffect, useState } from 'react';
import { Header, Segment, Button, Container, Grid } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
import Topics from '../layout/Topic';

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/api/documents/${id}`);
        setDocument(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchHistories = async () => {
      try {
        const response = await axios.get(`/api/histories/${id}`);
        setHistories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocument();
    fetchHistories();
  }, [id]);

  // Get user
  const [state] = useAuth();
  const { user } = state;
  const userID = user && user._id;
  const userDepartment = user && user.department;
  const isAuthenticated = state.isAuthenticated;

  if (!document) {
    return <Spinner />;
  }

  const handleEdit = () => {
    navigate(`/document/${id}/edit`);
  };

  const handleDelete = () => {
    axios
      .delete(`/api/documents/${id}`)
      .then(() => {
        // Add history record
        axios.post('/api/histories', {
          documentId: id,
          title: document.title,
          content: document.content,
          operation: 'Delete',
        });

        navigate('/', { replace: true });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const isOwner = () => {
    if (user && document.user === userID) {
      return true;
    }
    return false;
  };

  const isDepartment = () => {
    if (user && document.department === userDepartment) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={13}>
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                {/* <Image
                 src={post.author.photoURL}
                 size='tiny'
                 style={{ marginRight: '1rem' }}
                 /> */}
                <div>
                  <h5>版本修改人員 / 時間 :</h5>
                  {document.userName || '匿名 / '}
                  {'  /  '}
                  {new Date(document.date).toLocaleString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              {/* <Segment basic vertical>
               觀看次數: {post.viewCount || 0}
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 更改次數:{' '}
               {post.updateCount || 0}
                </Segment> */}

              <Header as='h1'>{document.title}</Header>
              {/* <Image src={post.imageUrl} size='large' /> */}
              <Segment basic vertical>
                {document.content}
              </Segment>

              <div>
                {isAuthenticated && isOwner() ? (
                  <>
                    <Button basic onClick={handleEdit}>
                      更改文章
                    </Button>
                    <Button color='red' onClick={handleDelete}>
                      刪除文章
                    </Button>
                  </>
                ) : isAuthenticated && isDepartment() ? (
                  <Button basic onClick={handleEdit}>
                    更改文章
                  </Button>
                ) : null}
              </div>
              <div>
                <h3>歷史紀錄</h3>
                {histories.map(history => (
                  <div key={history._id}>
                    <h2>{history.userName}</h2>
                    <p>操作：{history.operation}</p>
                    <p>
                      時間：
                      {new Date(history.date).toLocaleString([], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {/* Render other history details */}
                  </div>
                ))}
              </div>
            </>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

    // <div>
    //   <h2>{document.title}</h2>
    //   <p>{document.content}</p>
    //   <p>{document.department}</p>
    //   <p> {document.userName} </p>

    //   {isAuthenticated && isOwner() ? (
    //     <>
    //       <button onClick={handleEdit}>Edit</button>
    //       <button onClick={handleDelete}>Delete</button>{' '}
    //     </>
    //   ) : isAuthenticated && isDepartment() ? (
    //     <button onClick={handleEdit}>Edit</button>
    //   ) : null}
    // </div>
  );
};

export default DocumentDetail;
