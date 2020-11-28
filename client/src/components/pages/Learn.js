import React from 'react'
import { Pane, Heading, Button, Dialog  } from 'evergreen-ui'
import {
  ChevronLeftIcon,
  AutomaticUpdatesIcon
} from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSet, fetchSetsUser } from '../../actions/sets'

class Learn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        data: [
          {
            _id: '1',
            is_active: true,
            created_at: '2020-11-18T10:58:18.956Z',
            title: 'Friend',
            description: 'Bạn bè',
            language: 'VN',
            __v: 0,
          },
          {
            _id: '2',
            is_active: true,
            created_at: '2020-11-18T10:58:18.956Z',
            title: '1',
            description: 'số 1',
            language: 'VN',
            __v: 0,
          },
          {
            _id: '3',
            is_active: true,
            created_at: '2020-11-18T10:58:18.956Z',
            title: '2',
            description: 'số 2',
            language: 'VN',
            __v: 0,
          },
          {
            _id: '4',
            is_active: true,
            created_at: '2020-11-18T10:58:18.956Z',
            title: 4,
            description: 'số 4',
            language: 'VN',
            __v: 0,
          },
          {
            _id: '4',
            is_active: true,
            created_at: '2020-11-18T10:58:18.956Z',
            title: 5,
            description: 'số 5',
            language: 'VN',
            __v: 0,
          }
        ],
        cardIndex:0,//index của thẻ đang được học
        right_ans_1:[],//mảng chứa index của thẻ đã được trả lời đúng 1 lần
        right_ans_2:[],//mảng chứa index của thẻ đã được trả lời đúng 2 lần
        options:[],// mảng chứa các lựa chọn cho người học
        status:1,// 1 là câu hỏi title, 0 là câu hỏi description
        isShowAnsTrue:false,
        isShowAnsFalse:false,
        isShowDoneLearn:false,
        notify:{ 
          ans_true :"Bạn trả lời đúng",
          ans_false :"Bạn trả lời sai",
          done_learn:"Hoàn thành bài học"
        }
      }
      this.shuffleOptions();
    }
     shuffleOptions(){
      var data_length=this.state.data.length;
      this.state.options=[];
      for(var i=0;i<data_length;i++){
        if(i!=this.state.cardIndex){
          this.state.options.push(i);
        }
      }
      this.state.options=this.shuffle(this.state.options);
      this.state.options=this.state.options.slice(0,data_length>5?3:2);
      this.state.options.push(this.state.cardIndex);
      this.state.options=this.shuffle(this.state.options);
      console.log(this.state.options)
     }
     shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    check_ans(option) {
      var cardIndex=this.state.cardIndex;
      var data_length=this.state.data.length;
      if(option === cardIndex){
        this.setState({ isShowAnsTrue:true})
        if(!this.state.right_ans_1.includes(cardIndex)){
          this.state.right_ans_1.push(cardIndex);
          while(true){
            cardIndex=  Math.floor((Math.random() * data_length));
            if(!this.state.right_ans_2.includes(cardIndex)){
              break;
            }         
          }
          this.setState({cardIndex: cardIndex});
          this.shuffleOptions();
        }
        else{
          this.state.right_ans_2.push(cardIndex);
          if(this.state.right_ans_2.length==data_length){
            this.setState({ isShowDoneLearn:true})
          }
          else{
            while(true){
              cardIndex=  Math.floor((Math.random() * data_length));
              if(!this.state.right_ans_2.includes(cardIndex)){
                break;
              }         
            }
            this.setState({cardIndex: cardIndex});
            this.shuffleOptions();
          }
        }
      }
      else{
        this.setState({ isShowAnsFalse:true});
        while(true){
          cardIndex=  Math.floor((Math.random() * data_length));
          if(!this.state.right_ans_2.includes(cardIndex)){
            break;
          }         
        }
        this.setState({cardIndex: cardIndex});
        this.shuffleOptions();
      }
    }
  render() {
    return (
      <Pane
        display="flex"
        justifyContent="space-between"
      >
        <Dialog
        isShown={this.state.isShowAnsTrue}
        title="Thông báo"
        onCloseComplete={() =>this.setState({ isShowAnsTrue: false })}
        hasFooter={false}
      >
        {this.state.notify.ans_true}
        </Dialog>
        <Dialog
        isShown={this.state.isShowAnsFalse}
        title="Thông báo"
        onCloseComplete={() =>this.setState({ isShowAnsFalse: false })}
        hasFooter={false}
      >
        {this.state.notify.ans_false}
        </Dialog>
        <Dialog
        isShown={this.state.isShowDoneLearn}
        title="Chúc mừng bạn đã hoàn thành học phần"
        onCloseComplete={() =>this.setState({ isShowDoneLearn: false })}
        hasFooter={false}
      >
        <Link to={'/latest'} >
            <Pane display="flex" borderBottom="default" paddingBottom={10}>
              <Heading size={500} fontWeight={600}>Trở về học phần</Heading>
            </Pane>
          </Link>
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
            marginTop={50}
          >
            <Pane display="flex" marginLeft={10}>
              <AutomaticUpdatesIcon size={30}/>
              <Heading size={600} fontWeight={700} marginLeft={30}>Học</Heading>
            </Pane>
            <Pane  marginLeft={10} marginTop={60} >
              <Heading size={600} fontWeight={700}  >Còn lại</Heading>
              <Heading size={600} fontWeight={700}  >{this.state.data.length-this.state.right_ans_2.length}</Heading>
            </Pane>
            <Pane  marginLeft={10} marginTop={60} >
              <Heading size={600} fontWeight={700}>Quen thuộc</Heading>
              <Heading size={600} fontWeight={700}>{this.state.right_ans_1.length}</Heading>
            </Pane>
            <Pane  marginLeft={10} marginTop={60} >
              <Heading size={600} fontWeight={700}>Nắm vững</Heading>
              <Heading size={600} fontWeight={700}>{this.state.right_ans_2.length}</Heading>
            </Pane>
          </Pane>
        </Pane>
        <Pane
          height={500}
          width={1000}
          border="default"
          elevation={4}
          marginLeft={20}
          marginTop={20}
          marginBottom={20}
        >
          <Pane
            marginTop={50}
            marginLeft={100}
            marginRight={30}
          >
            <Heading size={600} fontWeight={700}>{this.state.data[this.state.cardIndex].title}</Heading>
          </Pane> 
          <Pane display="flex"  marginLeft={100} marginTop={200} >
            {this.state.options.map((option, index) =>(
               <Button  
               key={index}
               width={150} 
               height={80}
               border="default" 
               borderRadius={10}
               backgroundColor="#FAE3CD"
               marginTop={20}
               marginRight={100}
               paddingTop={30}
               paddingBottom={30}
               paddingLeft={50}
               onClick={() => {
                this.check_ans(option)
              }}
             >
               <Heading size={500} fontWeight={700} textAlign="center">{this.state.data[option].description}</Heading>
               </Button>
            ))}
          </Pane> 
          
        </Pane>
      </Pane>
    )
  }
}
const mapStateToProps = ({ sets }) => {
  return { sets }
}
export default connect(mapStateToProps, { fetchSet, fetchSetsUser })(Learn)
