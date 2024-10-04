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
