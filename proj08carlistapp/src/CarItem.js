const CarItem = ({car, showDetail, modifyCarData, removeCarData}) => {
    const {_id, name, price, company, year} = car;

    return (<tr>
        <td>{_id}</td>
        <td><button data-toggle="modal" data-target="#detailModal" onClick={e=>{
            showDetail(car);
        }} type="button" className="btn">{name}</button></td>
        <td>{price}</td>
        <td>{year}</td>
        <td><button  data-toggle="modal" data-target="#modifyModal" onClick={e=>{
            modifyCarData(car);
        }} type="button" className="btn btn-primary">수정</button></td>
        <td><button onClick={e=>{
            removeCarData(car);
        }} type="button" className="btn btn-danger">삭제</button></td>
    </tr>)
}

export default CarItem;