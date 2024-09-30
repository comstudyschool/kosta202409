
const carList = [
    {id:1, name:'GRANDEUR', price:3000, company:'HYUNDAI', year:2022},
    {id:2, name:'SONATA', price:2000, company:'HYUNDAI', year:2021},
    {id:4, name:'K9', price:2800, company:'KIA', year:2018},
    {id:5, name:'K7', price:2000, company:'KIA', year:2020},
    {id:6, name:'SANTAFE', price:3500, company:'HYUNDAI', year:2019}
];
let seqId = 107;

//class ProductDao { }
//module.exports = new ProductDao();
// 어차피 한번만 사용하는 객체라면 객체리터럴 사용

const ProductDAO = {
    findAll: ()=>{
        return [...carList];
    },
    findById: (id)=>{
        const idx = carList.findIndex((car)=>{
            return car.id === Number(id);
        });
        console.log("id of dao:", idx);
        if(idx !== -1) {
            return carList[idx];
        }
        return {};
    },
    create: (dto)=>{
        dto.id = seqId++;
        carList.push(dto);
        return [...carList];
    },
    update: (id, dto)=>{
        const idx = carList.findIndex((car)=>{
            // === 연산자는 타입까지 동일 해야 한다.
            return car.id === Number(id);
        });
        if(idx !== -1) {
            carList[idx] = dto;
        }
        return [...carList];
    },
    delete: (id)=>{
        const idx = carList.findIndex((car)=>{
            return car.id === Number(id);
        });
        if(idx !== -1) {
            carList.splice(idx, 1);
        }
        return [...carList];
    }
};

module.exports = ProductDAO;