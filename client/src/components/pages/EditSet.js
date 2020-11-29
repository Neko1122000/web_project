import React from 'react'
import { connect } from 'react-redux'
import { fetchSet } from '../../actions'

class EditSet extends React.Component {
  componentDidMount() {
    this.props.fetchSet(this.props.match.params.id)
  }
  render() {
    return (
      <p>
        Muốn sửa set <strong>{this.props.sets && this.props.sets.name}</strong>{' '}
        à? Đợi Sinh ngu làm trang này đã nhé :(
      </p>
    )
  }
}

const mapStateToProps = ({ sets }) => {
  return { sets: { ...sets }.data }
}
export default connect(mapStateToProps, { fetchSet })(EditSet)
