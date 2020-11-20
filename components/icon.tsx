import dynamic from 'next/dynamic'

type Props = {
  name: string
  width?: number
  height?: number
  fill?: string
  className?: string
  handleClick: (event: any) => void
}

const Icon = (props: Props) => {
  // this is a workaround to import module by variable
  // https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
  const IconFromSvg: any = dynamic(() => import('../public/assets/icons/' + props.name + '.svg'))
  return (
    <div className={props.className} onClick={props.handleClick}>
      <IconFromSvg width={props.width} height={props.height} fill={props.fill} />
    </div>
  )
}

export default Icon
