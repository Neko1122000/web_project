import React from 'react'
import { Pane, Button } from 'evergreen-ui'

class Latest extends React.Component {
  render() {
    return (
      <Pane>
        <Pane
          height={1000}
          width={701}
          float="left"
          style={{
            backgroundColor: '#E4E7EB',
          }}
        >
          <Pane
            elevation={3}
            height={120}
            margin={32}
            backgroundColor="white"
            fontFamily="Arial"
          >
            <Pane float="left" paddingLeft={15}>
              <img
                src="https://thumbs.dreamstime.com/z/book-sign-book-symbol-vector-illustration-32931677.jpg"
                width="100"
                height="100"
                alt="lul"
              />
            </Pane> 
            <Pane
              textAlign="center"
              paddingTop={15}>
              <p>Bạn đã tự tin với những gì mình được học, hãy <b>kiểm tra </b> nào.</p>
              <Button appearance="primary"> Test</Button>
            </Pane>
          </Pane>
          <Pane margin={34}>
            <Pane
              float="left"
              fontSize={22}
              style={{ fontFamily: 'Arial'}}>
              Recent
            </Pane>    
            <Pane height={22} textAlign="right" 
              fontSize={14}>
              <a href="#"> Show all</a>
            </Pane>   
          </Pane> 
          <Button 
            float="left"
            width={300}
            height={120}
            marginLeft={34}
            marginBottom={15}
            justifyContent="center"
            alignItems="center"> 
            <p>Bài 1</p>
          </Button>
          <Button
            width={300}
            height={120}
            marginLeft={34}
            marginBottom={15}
            justifyContent="center"
            alignItems="center">
            Bài 2
          </Button>
          <Button
            float="left"
            width={300}
            height={120}
            marginLeft={34}
            marginBottom={15}
            justifyContent="center"
            alignItems="center">
            Bài 3
          </Button>
          <Button 
            width={300}
            height={120}
            marginLeft={34}
            marginBottom={15}
            justifyContent="center"
            alignItems="center">Bài 4</Button>
        </Pane>
        <img
          style={{}}
          src="https://znews-photo.zadn.vn/w660/Uploaded/fcivbqmv/2019_06_15/gg_zing_2.jpg"
          width="250"
          height="1000"
          alt="lul"
        />

      </Pane>
    )
  }
}
export default Latest
