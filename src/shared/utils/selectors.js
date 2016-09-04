export const getEntities = (entity) => (state) => state.entities[entity]
export const getPage = (page) => (state) => state.pages[page]
export const mapListWithEntity = (list, entities) => list.map(id => entities[id])