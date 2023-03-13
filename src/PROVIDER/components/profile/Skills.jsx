import React from 'react'
import { Badge } from 'react-bootstrap'

const Skills = (props) => {
   let skills = props.skills;
  return (
   <>
   <div className="card shadow-sm mb-2" style={{padding: '4px 10px 8px', height:'100%'}}>
     <div className="card-title">
        <strong>Skills</strong>
     </div>
     <div>
     {skills.skill.map((item) => (
        <Badge pill bg="primary" style={{marginRight:'5px'}}>
         {item}
        </Badge> 
      ))}
     </div>
   </div>
   </>
  )
}

export default Skills