import dynamic from 'next/dynamic'

type Props = {
  name: string
}

const Icon = (props: Props) => {
  // this is a workaround to import module by variable
  // https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
  const IconFromSvg = dynamic(() => import('../public/assets/icons/' + props.name + '.svg'))
  return (
    <div>
      <IconFromSvg />
    </div>
  )
}

export default Icon
