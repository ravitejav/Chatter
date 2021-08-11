export const callBack = (time: number, callbackfunc: any) => {
    setTimeout(callbackfunc, time * 1000);
} 

export const uidExtractor = (email: string) => {
    return email.replaceAll('@', '').replaceAll('.', '');
}