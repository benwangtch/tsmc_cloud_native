import {
  Grid,
  Image,
  Button,
  Segment,
  Dropdown,
  Table,
  Input,
} from 'semantic-ui-react';
import React, { useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function Home() {
  const [profileImage, setProfileImage] = useState(
    'https://react.semantic-ui.com/images/wireframe/image.png'
  );
  const fileInputRef = useRef(null);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
    },
    // Add more events as needed in the Calendar section
  ]);

  const handleEventSelect = event => {
    console.log('Selected event:', event);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const options = [
    { key: '1', text: 'Profile', value: 'Profile' },
    { key: '2', text: 'Recent Files', value: 'Recent Files' },
    {
      key: '3',
      text: 'Machine Specifications',
      value: 'Machine Specifications',
    },
    { key: '4', text: 'System Requirements', value: 'System Requirements' },
    { key: '5', text: 'Employee Directory', value: 'Employee Directory' },
    { key: '6', text: 'IT Helpdesk', value: 'IT Helpdesk' },
    { key: '7', text: 'Training Materials', value: 'Training Materials' },
    { key: '8', text: 'Projects', value: 'Projects' },
    { key: '9', text: 'Notifications', value: 'Notifications' },
    { key: '10', text: 'Calendar', value: 'Calendar' },
    { key: '11', text: 'Settings', value: 'Settings' },
  ];

  const [files, setFiles] = useState([
    {
      name: 'Machine Specifications',
      type: 'PDF',
      size: '1.2 MB',
      modified: '2021/12/03',
      author: 'John Doe',
    },
    {
      name: 'System Requirements',
      type: 'Word Document',
      size: '2.5 MB',
      modified: '2021/11/29',
      author: 'Jane Smith',
    },
    {
      name: 'Employee Directory',
      type: 'PPT',
      size: '3.1 MB',
      modified: '2022/01/05',
      author: 'John Wick',
    },
    {
      name: 'IT Helpdesk',
      type: 'Word Document',
      size: '1.5 MB',
      modified: '2023/05/09',
      author: 'John Christopher Depp',
    },
    {
      name: 'Training Materials',
      type: 'Google Calendar',
      size: '2.5 MB',
      modified: '2022/07/01',
      author: 'Jason Statham',
    },
  ]);

  const addFile = () => {
    // Add a new file to the list
    setFiles([
      ...files,
      {
        name: 'New File',
        type: 'Unknown',
        size: 'N/A',
        modified: new Date().toLocaleDateString(),
        author: 'You',
      },
    ]);
  };

  const [userInfo, setUserInfo] = useState({
    name: 'John',
    email: 'john@gmail.com',
    department: 'IT',
    phone: '',
  });

  const handleUserInfoChange = (event, field) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [field]: event.target.value,
    }));
  };

  const handleOptionChange = (event, data) => {
    // Handle option selection
    const selectedOption = data.value;
    // Scroll to the corresponding section
    const section = document.getElementById(selectedOption);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmClick = () => {
    // Update user info when Confirm button is clicked
    // You can perform additional validation or API calls here if needed
    // For simplicity, we'll just update the state directly
    setUserInfo({
      name: document.getElementById('name-input').value,
      email: document.getElementById('email-input').value,
      department: document.getElementById('department-input').value,
      phone: document.getElementById('phone-input').value,
    });
  };

  return (
    <Grid celled='internally'>
      <Grid.Row>
        <Grid.Column width={2}>
          <div>
            <Image src={profileImage} size='large' />
            <Button
              basic
              onClick={handleButtonClick}
              style={{ marginTop: '1rem' }}
            >
              Upload Profile Image
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <Segment>
            <h3>User Info:</h3>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Department: {userInfo.department}</p>
            <p>Phone: {userInfo.phone}</p>
            <Button basic onClick={addFile} style={{ marginTop: '1rem' }}>
              Add File
            </Button>
          </Segment>
        </Grid.Column>

        <Grid.Column width={13}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              zIndex: 1,
            }}
          >
            <Dropdown
              placeholder='Select Function'
              fluid
              selection
              options={options}
              onChange={handleOptionChange}
            />
          </div>
          <h3 id='Recent Files'>Recent Files:</h3>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>Last Modified</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {files.map((file, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{file.name}</Table.Cell>
                  <Table.Cell>{file.type}</Table.Cell>
                  <Table.Cell>{file.size}</Table.Cell>
                  <Table.Cell>{file.modified}</Table.Cell>
                  <Table.Cell>{file.author}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <h3 id='Profile'>Profile Section</h3>
          <p>This is the profile section.</p>

          <h3 id='Machine Specifications'>Machine Specifications Section</h3>
          <p>This is the machine specifications section.</p>

          <h3 id='System Requirements'>System Requirements Section</h3>
          <p>This is the system requirements section.</p>

          <h3 id='Employee Directory'>Employee Directory Section</h3>
          <p>This is the employee directory section.</p>

          <h3 id='IT Helpdesk'>IT Helpdesk Section</h3>
          <p>This is the IT helpdesk section.</p>

          <h3 id='Training Materials'>Training Materials Section</h3>
          <p>This is the training materials section.</p>

          <h3 id='Projects'>Projects</h3>
          <p>This is the projects section.</p>

          <h3 id='Notifications'>Notifications</h3>
          <p>This is the notifications section.</p>

          <h3 id='Calendar'>Calendar</h3>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            onSelectEvent={handleEventSelect}
          />

          <h3 id='Settings'>Settings</h3>
          <div>
            <Input
              id='name-input' // Add an ID to access the input element
              label='Name'
              value={userInfo.name}
              onChange={event => handleUserInfoChange(event, 'name')}
            />
            <Input
              id='email-input' // Add an ID to access the input element
              label='Email'
              value={userInfo.email}
              onChange={event => handleUserInfoChange(event, 'email')}
            />
            <Input
              id='department-input' // Add an ID to access the input element
              label='Department'
              value={userInfo.department}
              onChange={event => handleUserInfoChange(event, 'department')}
            />
            <Input
              id='phone-input' // Add an ID to access the input element
              label='Phone'
              value={userInfo.phone}
              onChange={event => handleUserInfoChange(event, 'phone')}
            />
            <Button
              basic
              onClick={handleConfirmClick}
              style={{ marginTop: '1rem' }}
            >
              Confirm
            </Button>
          </div>
          {/* Add more sections here */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
