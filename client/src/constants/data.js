export const chats = [
  {
    name: 'John Doe',
    _id: '1',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    lastMessage: 'Hello, how are you?',
    groupChat: false,
    members: [1, 2],
  },
  {
    name: 'Jane Doe',
    _id: '2',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    lastMessage: 'Hello, how are you?',
    groupChat: false,
    members: [1, 2],
  },
  {
    _id: 3,
    name: 'Affan Khan',
    avatar: '',
    lastMessage: 'Hello, how are you?',
  },
  {
    _id: 4,
    name: 'Om Behra',
    avatar: '',
    groupChat: false,
  },
  {
    _id: 5,
    name: 'Kumar',
    avatar: '',
    members: [1, 2],
  },
]

export const users = [
  {
    _id: 1,
    username: 'John Doe',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    _id: 2,
    username: 'Jane Doe',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    _id: 3,
    username: 'Affan Khan',
    avatar: [],
  },
  {
    _id: 4,
    username: 'Om Behra',
    avatar: [],
  },
  {
    _id: 5,
    username: 'Kumar',
    avatar: [],
  },
]

export const notifications = [
  {
    _id: 1,
    sender: {
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      username: 'John Doe',
    },
  },
  {
    _id: 2,
    sender: {
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      username: 'Jane Doe',
    },
  },
]

export const messages = [
  {
    attachments: [
      {
        public_id: 'asdsad 2',
        url: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    ],
    content: 'Hello how are you?',
    _id: 'asdfasdf',
    sender: {
      _id: '1',
      name: 'John ',
    },
    chat: 'chatId',
    createdAt: '2024-02-12T10:41:30.630Z',
  },

  {
    attachments: [
      {
        public_id: 'asdsad 2',
        url: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    ],
    content: 'This is a message',
    _id: 'asfdsf',
    sender: {
      _id: 'sdfsdfsdf',
      name: 'Jane',
    },
    chat: 'chatId',
    createdAt: '2024-02-12T10:41:30.630Z',
  },
]

export const dashboardData = {
  users: [
    {
      name: 'John Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      _id: '1',
      username: 'john_doe',
      friends: 20,
      groups: 5,
    },
    {
      name: 'John Boi',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      _id: '2',
      username: 'john_boi',
      friends: 20,
      groups: 25,
    },
  ],
  chats: [
    {
      name: 'New Group',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '1',
      groupChat: false,
      members: [
        { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
        { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: 'John Doe',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
    {
      name: 'Group 1',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '2',
      groupChat: true,
      members: [
        { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
        { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: 'John Boi',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: 'Message hai',
      _id: 'sfnsdjkfsdnfkjsbnd',
      sender: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        name: 'Chaman ',
      },
      chat: 'chatId',
      groupChat: false,
      createdAt: '2024-02-12T10:41:30.630Z',
    },

    {
      attachments: [
        {
          public_id: 'asdsad 2',
          url: 'https://www.w3schools.com/howto/img_avatar.png',
        },
      ],
      content: '',
      _id: 'sfnsdjkfsdnfkdddjsbnd',
      sender: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        name: 'Chaman  2',
      },
      chat: 'chatId',
      groupChat: true,
      createdAt: '2024-02-12T10:41:30.630Z',
    },
  ],
}
