import React from 'react'

const InputType = ({types, names, vlues, styles, classNames, placeholders, functions}) => {
  return (
    <input type={types}
           name={names}
           placeholder={placeholders}
           onChange={functions}
           style={styles}
           className={classNames}
    />     
      
  )
}

export default InputType