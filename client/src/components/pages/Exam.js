import React from 'react'
import { Pane, Heading,TextInput,Button, Dialog} from 'evergreen-ui'
import { 
  ChevronLeftIcon,
  ApplicationIcon,
  TickCircleIcon
} from 'evergreen-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSet } from '../../actions'

class Test extends React.Component {
  
  async componentDidMount() {
    await this.props.fetchSet(this.props.location.pathname.substring(5))
    this.setState({ data: this.props.sets.flash_cards})
  }
  state={
    isShow:false,
    statuses:[],
    pre_answer:{
      index:0,
      value:""
    },
    answers:[],
    data: [],
  }    
  check_answers(){
   var tem_isShow = true;
   this.setState({ isShow:tem_isShow})
   var tem_statuses = this.state.statuses
   for(var i=0;i<this.state.data.length;i++){
      tem_statuses.push("false");
    }
  
   for(var j=0;j<this.state.data.length;j++){
     if(this.state.data[j].description===this.state.answers[j]
     &&this.state.answers[j]!==""){
       tem_statuses[j]="true";
     }
     else{tem_statuses[j]="false"}
   }
   console.log(tem_statuses)
   this.setState(prevState=>({statuses:tem_statuses}))
   console.log(this.state.statuses)
  }

  pull_answer(e,index){
    var tem_answers = this.state.answers;
    if(tem_answers.length===0){
      for(var i=0;i<this.state.data.length;i++){
        tem_answers.push("");
      }
      tem_answers[index]=e.target.value;
      this.setState({answers:tem_answers});
    }else{
      tem_answers[index]=e.target.value;
      this.setState({answers:tem_answers});
    }
    console.log(this.state.answers);
  }
  calculator_mark(){
    var count_true_answ=0;
    var data_length=this.state.data.length==0?1:this.state.data.length
    for(var i=0;i<data_length;i++){
      if(this.state.statuses[i]==="true")
        count_true_answ++;
    }
   return Math.floor(count_true_answ*100/data_length)
  }
 
  render() {
    return(
      <Pane
      display="flex"
      justifyContent="space-between"
      > 
        <Dialog
          isShown={this.state.isShow}
          title="Kết quả bài kiểm"
          onCloseComplete={() => this.setState({ isShow: false })}
          hasFooter={false}
        >
          <Pane display="flex">
            <Pane>
            {!this.state.data
                ? 'loading'
                :this.state.data.map((item, index)=>(
              <Pane>
              <Pane marginTop={30} marginBottom={30}>
                <Pane display="flex" marginBottom={20}>
                  <Heading size={600} fontWeight={700} marginRight={10}>Câu số {index}:</Heading>
                  <Heading size={600} fontWeight={400}>{item.title}</Heading>
                </Pane>
                <Pane display="flex" width="200">
                  <Pane>
                   <Heading>{this.state.answers[index]===""?"Chưa trả lời":"Câu trả lời: ".concat(this.state.answers[index])}</Heading>
                  </Pane>
                  <TickCircleIcon size={30} color={this.state.statuses[index]==="true"?"success":"danger"} marginRight={20} marginLeft={20} />
                </Pane>
                <Heading>{this.state.statuses[index]==="true"?"":"Đáp án: ".concat(this.state.data[index].description)}</Heading>
              </Pane>
              </Pane>
            ))}
            </Pane>
            <Pane>
            <Pane
               height={100}
               width={150}
               backgroundColor="#D2EEF3"
               border="default"
               borderRadius={10}
               elevation={4}
               marginLeft={150}
               marginTop={20}
               marginBottom={20}
               textAlign="center"
               paddingTop={25}
                ><Heading size={900} fontWeight={800}>{this.calculator_mark()}</Heading>
            </Pane>
            <Pane
               height={50}
               width={150}
               backgroundColor="#D2EEF3"
               border="default"
               borderRadius={10}
               elevation={4}
               marginLeft={150}
               marginTop={20}
               marginBottom={20}
               textAlign="center"
               paddingTop={10}
            >
              <Link to={`/exam/${this.props.location.pathname.substring(5)}`}>
                <Heading size={400}  fontWeight={700}>Kiểm tra lại</Heading>
              </Link>
            </Pane>
            </Pane>
          </Pane>

        </Dialog>
        <Pane 
          height={530}
          width={200}
          border="default"
          elevation={4}
          paddingLeft={20}
          paddingTop={30}
          textAlign="center"
        >
          <Link to={'/latest'} >
            <Pane display="flex" borderBottom="default" paddingBottom={10}>
              <ChevronLeftIcon size={20} color="#28A7A7"/>
              <Heading size={500} fontWeight={600}>Trở về học phần</Heading>
            </Pane>
          </Link>
          <Pane 
            marginTop={150}
          >
            <Pane display="flex" marginLeft={10}>
              <ApplicationIcon size={30}/>
              <Heading size={600} fontWeight={700} marginLeft={10}>Kiểm tra</Heading>
            </Pane>
          </Pane>
        </Pane>
        <Pane
          width={1000}
          border="default"
          elevation={4}
          marginLeft={20}
          marginTop={20}
          marginBottom={20}
        >

          <Pane marginTop={50} marginLeft={50}>
            {!this.state.data
                ? 'loading'
                :this.state.data.map((item, index)=>(
              <Pane marginTop={30} marginBottom={30}>
              <Pane display="flex" marginBottom={10}>
                <Heading size={500} fontWeight={700} marginRight={10}>Câu số {index}:</Heading>
                <Heading size={500} fontWeight={400}>{item.title}</Heading>
              </Pane>
              <TextInput 
                marginLeft={20}
                onChange={(e) => {this.pull_answer(e, index)}}
              ></TextInput>
            </Pane>
            ))}
          </Pane>
          <Pane marginLeft={50}>
            <Button
              height={100}
              widht={1000}
              appearance="primary"
              onClick={() => {
                this.check_answers()
              }}
            >
              <Heading size={700} fontWeight={900}>{this.state.data
                ? 'loading'
                :"Nộp bài"}</Heading>
            </Button>
          </Pane>
        </Pane>

      </Pane>
    )
  }
}

const mapStateToProps = ({ sets }) => {
  return { sets: { ...sets }.data }
}

export default connect(mapStateToProps, { fetchSet })(Test)
