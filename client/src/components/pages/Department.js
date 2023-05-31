import React, { useState, useEffect } from 'react';
import { Container, Grid, Item, Image, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Topics from '../layout/Topic';
import axios from 'axios';

const Department = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  const onClick = documentId => {
    navigate(`/document/${documentId}`);
  };

  useEffect(() => {
    axios
      .get('/api/department')
      .then(res => {
        setDocuments(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  if (!documents) {
    return <Spinner />;
  }
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={9}>
            <Item.Group>
              {documents.map(document => {
                return (
                  <Item
                    key={document._id}
                    as={Link}
                    to={`/document/${document._id}`}
                  >
                    {/* <Image src={post.imageUrl} size='tiny' /> */}

                    <Item.Content>
                      <Item.Meta>
                        <Icon name='user circle' size='small' />
                        {/* {post.author.photoURL ? (
                          <Image src={post.author.photoURL} width={25} />
                        ) : (
                          <Icon name='user circle' size='small' />
                        )} */}
                        {document.department} • {document.userName || '匿名'} •{' '}
                        {new Date(document.date).toLocaleString([], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Item.Meta>

                      <Item.Header>{document.title}</Item.Header>
                      <Item.Description>{document.content}</Item.Description>
                      <Item.Extra>
                        {/* <a href={`/posts/${post.id}/edit`}> */}
                        {/* 修改次數 : {post.updateCount || 0} */}
                        {/* </a>{" "} */} {/* <a href={`/posts/${post.id}`}> */}
                        {/* 觀看次數 : {post.viewCount || 0} */}
                        {/* </a> */}
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

    // <div>
    //   <h1>Department Documents</h1>
    //   <ul>
    //     {documents.map(document => (
    //       <li key={document._id}>
    //         <h2>{document.title}</h2>
    //         <p>{new Date(document.date).toLocaleDateString()}</p>
    //         <p>{document.userName}</p>
    //         <button onClick={() => onClick(document._id)}>view</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Department;
