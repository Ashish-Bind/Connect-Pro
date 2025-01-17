/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { primary } from '../constants/color'
import { fileFormat } from '../libs/features'
import RenderAttachment from './RenderAttachment'
import { motion } from 'framer-motion'

const Message = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message

  const sameSender = sender?._id === user?._id

  const timeago = moment(createdAt).fromNow()

  return (
    <motion.div
      initial={{ opacity: 0, x: '-100%' }}
      whileInView={{ opacity: 1, x: '0' }}
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        padding: '0.5rem 1rem',
        width: 'fit-content',
      }}
    >
      {
        <Typography color={primary} fontWeight={'600'} variant="caption">
          {!sameSender ? sender?.name : 'You'}
        </Typography>
      }
      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url
          const file = fileFormat(url)

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: 'black',
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          )
        })}

      <Typography variant="caption" color="text.secondary">
        {timeago}
      </Typography>
    </motion.div>
  )
}

export default Message
