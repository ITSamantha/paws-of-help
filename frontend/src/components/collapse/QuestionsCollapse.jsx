
import { Typography, Collapse } from 'antd';


const { Paragraph} = Typography;
const { Panel } = Collapse;


export default function QuestionsCollapse (){
    return (
        <div>
            <Collapse 
            accordion 
            style={{ marginTop: '24px', backgroundColor: '#fff', textAlign:"left"}}
            bordered={false}
            >
            <Panel header="Как часто можно сдавать кровь?" key="1" >
                <Paragraph>Кошки - не чаще 1 раза в 3 месяца, собаки - 1 раз в месяц.</Paragraph>
            </Panel>
            <Panel header="Это безопасно для моего питомца?" key="2">
                <Paragraph>Да, процедура безопасна и проводится под контролем ветеринара.</Paragraph>
            </Panel>
            <Panel header="Какие анализы нужны?" key="3">
                <Paragraph>Общий анализ крови, биохимия, тесты на инфекции.</Paragraph>
            </Panel>
            </Collapse>
        </div>
    )
}