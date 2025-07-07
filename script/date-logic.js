export function getDeliveryDate(deliveryDate){
    const today = new Date();
    today.setDate(today.getDate() + deliveryDate);
    const option = {
        weekday: "long", 
        month: "long", 
        day: "numeric"
    };
    return new Intl.DateTimeFormat("en-US",option).format(today);
}