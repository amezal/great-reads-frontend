import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAuth0 } from '@auth0/auth0-react';
import { FaTimes } from 'react-icons/fa'
import axios from 'axios';
import './DraggableLists.css';

const read = [
  { _id: '1', title: 'Hola' },
  { _id: '2', title: 'Hello' },
  { _id: '3', title: 'Nihao' },
]
const reading = [
  { _id: '4', title: 'Adios' },
  { _id: '5', title: 'Goodbye' },
  { _id: '6', title: 'Zai jian' },
]

const reorder = (arr1, arr2, startIndex, endIndex) => {
  const [removed] = arr1.splice(startIndex, 1);
  arr2.splice(endIndex, 0, removed);
  return [arr1, arr2]
}
// console.clear();
// const x = reorder(reading, reading, 0, 1)
// console.log(x);


function DraggableLists({ userBooks }) {

  const initialLists = { read, reading };
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

  return (


    <div className="lists">
      {books &&
        <DragDropContext onDragEnd={dragEndHandler}>
          <div className="list">
            <h2>Read</h2>
            <Droppable droppableId="read">
              {(dropppableProvided) => (
                <ul
                  {...dropppableProvided.droppableProps}
                  ref={dropppableProvided.innerRef}
                  className="list"
                >
                  {books.read.map((book, index) => (
                    <Draggable key={book._id} draggableId={book._id} index={index}>
                      {(draggableProvided) => (
                        <li
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          className="list__item">
                          {book.title}
                          <button onClick={() =>
                            deleteBook(dropppableProvided.droppableProps['data-rbd-droppable-id'],
                              draggableProvided.draggableProps['data-rbd-draggable-id'])}>
                            <FaTimes size="15"></FaTimes>
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {dropppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="list">
            <h2>Want to read</h2>
            <Droppable droppableId="want">
              {(dropppableProvided) => (
                <ul
                  {...dropppableProvided.droppableProps}
                  ref={dropppableProvided.innerRef}
                  className="list"
                >
                  {books.want.map((book, index) => (
                    <Draggable key={book._id} draggableId={book._id} index={index}>
                      {(draggableProvided) => (
                        <li
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          className="list__item">
                          {book.title}
                          <button onClick={() =>
                            deleteBook(dropppableProvided.droppableProps['data-rbd-droppable-id'],
                              draggableProvided.draggableProps['data-rbd-draggable-id'])}>
                            <FaTimes size="15"></FaTimes>
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {dropppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="list">
            <h2>Reading</h2>
            <Droppable droppableId="reading">
              {(dropppableProvided) => (
                <ul
                  {...dropppableProvided.droppableProps}
                  ref={dropppableProvided.innerRef}
                  className="list"
                >
                  {books.reading.map((book, index) => (
                    <Draggable key={book._id} draggableId={book._id} index={index}>
                      {(draggableProvided) => (
                        <li
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          className="list__item">
                          {book.title}
                          <button onClick={() =>
                            deleteBook(dropppableProvided.droppableProps['data-rbd-droppable-id'],
                              draggableProvided.draggableProps['data-rbd-draggable-id'])}>
                            <FaTimes size="15"></FaTimes>
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {dropppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      }
    </div >
  );
}

export default DraggableLists;
