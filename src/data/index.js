import { WechatLogo, Users, Phone, GearSix, Image, Sticker, Camera, FileArrowUp, User } from '@phosphor-icons/react'
import React from 'react'
import { faker } from '@faker-js/faker'

const Nav_Buttons = [
  {
    index: 0,
    icon: <WechatLogo />
  },
  {
    index: 1,
    icon: <Users />
  },
  {
    index: 2,
    icon: <Phone />
  }
]

const Nav_Settings = [
  {
    index: 3,
    icon: <GearSix />
  }
]

const Chat_Footer = [
  {
    index: 4,
    color: '#d1c4e9',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video'
  },
  {
    index: 5,
    color: '#b39ddb',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Stickers'
  },
  {
    index: 6,
    color: '#9575cd',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Camera'
  },
  {
    index: 7,
    color: '#7e57c2',
    icon: <FileArrowUp size={24} />,
    y: 312,
    title: 'Document'
  },
  {
    index: 8,
    color: '#673ab7',
    icon: <User size={24} />,
    y: 382,
    title: 'Contact'
  }
]

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '9:36',
    unread: 0,
    pinned: true,
    online: true
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '12:02',
    unread: 2,
    pinned: true,
    online: false
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '10:35',
    unread: 3,
    pinned: false,
    online: true
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '04:00',
    unread: 0,
    pinned: false,
    online: true
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  }
]

const Chat_History = [
  {
    type: 'msg',
    message: 'Hi 👋🏻, How are ya ?',
    incoming: true,
    outgoing: false
  },
  {
    type: 'divider',
    text: 'Today'
  },
  {
    type: 'msg',
    message: 'Hi 👋 Panda, not bad, u ?',
    incoming: false,
    outgoing: true
  },
  {
    type: 'msg',
    message: 'Can you send me an abstarct image?',
    incoming: false,
    outgoing: true
  },
  {
    type: 'msg',
    message: 'Ya sure, sending you a pic',
    incoming: true,
    outgoing: false
  },

  {
    type: 'msg',
    subtype: 'img',
    message: 'Here You Go',
    img: faker.image.url({ category: 'abstract' }),
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    message: 'Can you please send this in file format?',
    incoming: false,
    outgoing: true
  },

  {
    type: 'msg',
    subtype: 'doc',
    message: 'Yes sure, here you go.',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'link',
    preview: faker.image.url({ category: 'cats' }),
    message: 'Yep, I can also do that',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'reply',
    reply: 'This is a reply',
    message: 'Yep, I can also do that',
    incoming: false,
    outgoing: true
  }
]

export { Nav_Buttons, Nav_Settings, ChatList, Chat_Footer, Chat_History }
