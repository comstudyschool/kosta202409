import { useEffect, useState } from "react";

const CarModifyModal = ({modalData, modifyOk}) => {
    const [carName, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [company, setCompany] = useState("");
    const [year, setYear] = useState(0);

    // sueEffect 훅을 이용해서 상태 변경 확인
    useEffect(() => {
        console.log("특정 상태나 props가 변경되었습니다.");
        setName(modalData.name);
        setPrice(modalData.price);
        setCompany(modalData.company);
        setYear(modalData.year);
    }, [modalData]);
    
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
                            <td><input type="text" value={carName} onChange={e=>{setName(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <th>PRICE</th>
                            <td><input type="text" value={price} onChange={e=>{setPrice(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <th>COMPANY</th>
                            <td><input type="text" value={company} onChange={e=>{setCompany(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <th>YEAR</th>
                            <td><input type="text" value={year} onChange={e=>{setYear(e.target.value)}} /></td>
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