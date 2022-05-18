import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import { Link } from 'react-router-dom'
import stc from 'string-to-color'

import './Avatar.css'

export enum AvatarSize {
  SMALL = 16,
  MEDIUM = 48,
  LARGE = 128,
}
export interface IAvatarProps {
  username: string
  size?: AvatarSize
}
const defaultProps = {
  size: AvatarSize.MEDIUM,
}
export const Avatar = ({ username, size }: IAvatarProps & typeof defaultProps) => {
  const avatar = createAvatar(
    style,
    {
      seed: username,
      dataUri: true,
      size,
      scale: 80,
    },
  )
  return (
    <div>
      <div className="avatar" style={{ backgroundColor: stc(username) }}>
        <Link to={`/${username}`}>
          <div className={`avatar-name avatar-${size ?? defaultProps.size}`}>
            {/* {username.substring(0, 1).toUpperCase()} */}
            <img src={avatar} alt={username} />
          </div>
        </Link>
      </div>
    </div>
  )
}
Avatar.defaultProps = defaultProps
