const Title = ({ text }: { text: string }) => {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 font-light text-opacity-90 text-xs'>
        {text}
    </h6>
  )
}

export default Title;