import React from 'react'

const ButtonType = ({ types, functions, styles, classNames, text}) => {
  return (
    <button
       type={types}
       style={styles}
       className={classNames}
       onClick={functions}
    >{text}</button>   
  )
}

export default ButtonType