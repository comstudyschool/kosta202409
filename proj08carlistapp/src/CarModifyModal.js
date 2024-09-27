import { useState } from "react";

const CarModifyModal = ({modalData, modifyOk}) => {
    const [carName, setName] = useState(modalData.name);
    const [price, setPrice] = useState(modalData.price);
    const [company, setCompany] = useState(modalData.company);
    const [year, setYear] = useState(modalData.year);

    return (<>
        {/* <!-- The Modal --> */}
        <div className="modal fade" id="modifyModal">
            <div className="modal-dialog">
                <div className="modal-content">
                
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">중고 자동차 정보 수정</h4>
                    <button type="button" className="close" data-dismiss="modal">×</button>
                </div>
                
                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{modalData._id}</td>
                        </tr>
                        <tr>
                            <th>NAME</th>
                            <td><input type="text" value={carName=="#!*"?modalData.name:carName} onChange={e=>{setName(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <th>PRICE</th>
                            <td><input type="text" value={price==-1?modalData.price:price} onChange={e=>{setPrice(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <th>COMPANY</th>
                            <td><input type="text" value={company=="#!*"?modalData.company:company} onChange={e=>{setCompany(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <th>YEAR</th>
                            <td><input type="text" value={year==-1?modalData.year:year} onChange={e=>{setYear(e.target.value)}} /></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                
                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                    <button onClick={(e)=>{
                        const _id = modalData._id;
                        modifyOk({_id, name:carName, price, company, year});
                    }} type="button" className="btn btn-primary" data-dismiss="modal">수정완료</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                
                </div>
            </div>
        </div>    
    </>);
}

export default CarModifyModal;