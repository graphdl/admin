import { Resource } from "react-admin"


export const Noun = props => {

  return <Resource {...props} name='test' recordRepresentation='test' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
}