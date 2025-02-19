import { getNameInitials } from '@/utilities/get-name-initials'
import {Avatar as AntdAvatar, AvatarProps} from 'antd'

type Props = AvatarProps & {
    name?: string,
}

const CustomAvatar = ({name, style, ...rest}: Props) => {
  return (
    <AntdAvatar
    alt={name}
    size={50}
    style={{
        backgroundColor:'rgba(114, 11, 2, 1)',
        display: 'flex',
        alignItems: 'center',
        border:'none',
        ...style
    }}
    {...rest}
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar

