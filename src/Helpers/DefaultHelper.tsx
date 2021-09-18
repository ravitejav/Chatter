export const randomStringGen = (length: number = 10) => {
    const mainString = 'ASDFGHJKLPOIUYTREWQZXCVBNMasdfghjklpoiuytrewqzxcvbnm1234567890';
    let randomString = '';
    for (let i = 0; i < length; i++) randomString = randomString + mainString[randomNumberGen(i)];
    return randomString;
}

export const randomNumberGen = (min: number = 0, max: number = 61) => Math.floor((Math.random() * max) + min);