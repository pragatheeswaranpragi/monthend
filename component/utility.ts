export const filteredValue = (list: any, accesor: string, salary: number) => {
    const listArr = list.filter((item: any) => {
        if(item.type.value === accesor){
            return item;
        }
    })
    const createArr = listArr.map((data: any) => {
        return data.price
    })
    const sum = createArr.reduce((acc: any, prev: any) => Number(acc) + Number(prev), 0);
    const totalPercentage = sum*100/salary
    return sum
}