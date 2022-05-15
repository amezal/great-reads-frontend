import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from '../components/List';
import Lists from '../components/Lists';
import BookItem from '../components/BookItem';
import { useAuth0 } from '@auth0/auth0-react';
import { FaTimes } from 'react-icons/fa'
import axios from 'axios';
import './DraggableLists.css';

const reorder = (arr1, arr2, startIndex, endIndex) => {
  const [removed] = arr1.splice(startIndex, 1);
  arr2.splice(endIndex, 0, removed);
  return [arr1, arr2]
}


function DraggableLists({ userBooks }) {

  const [books, setBooks] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setBooks(userBooks);
  }, [])

  const dragEndHandler = async (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index
      && source.droppableId === destination.droppableId
    ) {
      return;
    }
    const [arr1, arr2] = reorder(books[source.droppableId], books[destination.droppableId], source.index, destination.index);
    setBooks({ ...books, [source.droppableId]: arr1, [destination.droppableId]: arr2 });

    //call api
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = await getAccessTokenSilently();
    const list = destination.droppableId;
    const bookId = books[destination.droppableId][destination.index]._id;
    await axios.patch(`${serverUrl}/users/current/${list}?book=${bookId}`,
      { books },
      {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
  }

  const deleteBook = async (list, bookId) => {

    const newList = books[list].filter(book => book._id !== bookId);
    setBooks({ ...books, [list]: newList });
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = await getAccessTokenSilently();
    await axios.delete(`${serverUrl}/users/current/${list}?book=${bookId}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
  }

  const lists = {
    read: 'Read',
    want: 'Want to read',
    reading: 'Reading',
  }

  return (
    <Lists>
      {books &&
        <DragDropContext onDragEnd={dragEndHandler}>
          {Object.keys(lists).map((list, i) => (
            <List className="list" title={lists[list]} key={list}>
              <Droppable droppableId={list} style={{}}>
                {(dropppableProvided) => (
                  <div
                    {...dropppableProvided.droppableProps}
                    ref={dropppableProvided.innerRef}
                    className="list"
                    style={{ minHeight: '80px' }}
                  >
                    {books[list].map((book, index) => (
                      <Draggable key={book._id} draggableId={book._id} index={index}>
                        {(draggableProvided) => (
                          <div
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                            className="list__item"
                          >
                            <BookItem
                              book={book}
                              list={list}
                              deleteBook={() =>
                                deleteBook(dropppableProvided.droppableProps['data-rbd-droppable-id'],
                                  draggableProvided.draggableProps['data-rbd-draggable-id'])}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {dropppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </List>
          ))}
        </DragDropContext>
      }
    </Lists >

  );
}

export default DraggableLists;
