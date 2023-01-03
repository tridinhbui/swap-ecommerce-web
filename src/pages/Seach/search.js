import {
    InstantSearch,
    Configure,
    Hits,
    SearchBox,
    RefinementList,
    Pagination,
} from 'react-instantsearch-dom';
import Hit from '../Home/hit';
import algoliasearch from 'algoliasearch/lite';
import "./search.css"

const searchClient = algoliasearch(
    'FUH27QK0B4',
    '95975dfd853601f433605af8a9de4734'
);



export default function Search() {
    return (
        <InstantSearch searchClient={searchClient} indexName="items">
            <div className = "container">
            <h1 >Welcome to Loop Store!</h1>
            <h2 >to push your items to Loop Store, go to My Item page </h2>
            <Configure hitsPerPage={6} />
            <div id="searchbox"> <SearchBox translations={{ placeholder: "Search for items" }} /> </div>
            <div id="hits"> <Hits hitComponent={Hit} /> </div>
            <div id="pagination"> <Pagination /> </div>
            </div>
        </InstantSearch>
    );

}