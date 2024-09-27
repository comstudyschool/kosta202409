import CarItem from "./CarItem";

const Output = ({carList, showDetail, modifyCarData, removeCarData}) => {

    const makeRow = () => {
        return (
            carList.map((car)=>{
                return <CarItem 
                    showDetail={showDetail} 
                    modifyCarData={modifyCarData}
                    removeCarData={removeCarData}
                    key={car._id} 
                    car={car} />
            })
        );
    }

    return (<div className="container">
        <h2>거래 가능 중고 자동차 목록</h2>
        <p>관심 있는 상품을 선택 하세요. (하면 된다)</p>            
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>NO</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>YEAR</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                {makeRow()}
            </tbody>
        </table>
    </div>);
}

export default Output;