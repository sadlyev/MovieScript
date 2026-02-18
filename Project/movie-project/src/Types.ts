export type MovieType = {
id: number;
title: string;
originalTitle:	string
language:	string
relaseYear:number
releaseDate:	string
genres:	[]
plot:	string
runtime:number
budget:	string
revenue:	string
homepage:	string
status:	string
posterUrl:	string
backdropUrl:	string
trailerUrl:	string
trailerYoutubeId:	string
tmdbRating:	number
searchL:	string
keywords:	[]
countriesOfOrigin:	[]
languages:	[]
cast:	[]
director:	string
production:	string
awardsSummary:	string
}

export type RegisterUser = {email: string, password: string, name: string, surname: string}