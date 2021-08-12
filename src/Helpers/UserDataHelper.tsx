import { uidExtractor } from "./CallBackHelper";

export const extractSearchResults = (searchText: string, searchResults: any, currentUserEmail: string) => {
    searchResults[uidExtractor(currentUserEmail)] = null;
    return Object.keys(searchResults)
        .map(userId => {
            if(searchResults[userId]) {
                if(searchResults[userId].email.includes(searchText) || searchResults[userId].name.includes(searchText)) {
                    return searchResults[userId];
                }
            }
            return null;
        })
        .filter(ele => ele != null);
}