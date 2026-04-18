const DoublyNode = require("./DoublyNode");

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  addFirst(value) {
    const newNode = new DoublyNode(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this._size++;
  }

  addLast(value) {
    const newNode = new DoublyNode(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }
    this._size++;
  }

  removeFirst() {
    if (this.head === null) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    } else {
      this.head.previous = null;
    }
    this._size--;
    return value;
  }

  removeLast() {
    if (this.tail === null) {
      return null;
    }
    const value = this.tail.value;
    this.tail = this.tail.previous;
    if (this.tail === null) {
      this.head = null;
    } else {
      this.tail.next = null;
    }
    this._size--;
    return value;
  }

  contains(value) {
    let current = this.head;
    while (current !== null) {
      if (this._isSameValue(current.value, value)) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  countOccurrences(value) {
    let count = 0;
    let current = this.head;          // misma idea: empezar desde head

    while (current !== null) {        // mientras haya nodos
      if (this._isSameValue(current.value, value)) {
        count++;
      }
      current = current.next;         // avanzar igual que en Simple
    }

    return count;
  }

  // es identica a la simple
  clean() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  reverseInPlace() {
    let current = this.head;
    let temp = null;

    while (current !== null) {
      temp = current.previous;       // 1. guardar previous
      current.previous = current.next; // 2. previous apunta hacia atrás (ahora es next)
      current.next = temp;           // 3. next apunta hacia adelante (era previous)
      current = current.previous;    // 4. avanzar (el nuevo "siguiente" es el viejo previous)
    }

    // intercambiar head y tail
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }

  removeDuplicates() {
    let current = this.head;

    while (current !== null) {
      let runner = current;

      while (runner.next !== null) {
        if (this._isSameValue(runner.next.value, current.value)) {
          const toRemove = runner.next;
          runner.next = toRemove.next;        // saltar el duplicado

          if (toRemove.next !== null) {
            toRemove.next.previous = runner;  // reparar el puntero previous
          } else {
            this.tail = runner;               // era el tail
          }
          this._size--;
        } else {
          runner = runner.next;
        }
      }

      current = current.next;
    }
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  toForwardString() {
    let out = "[";
    let current = this.head;
    while (current !== null) {
      out += String(current.value);
      if (current.next !== null) {
        out += ", ";
      }
      current = current.next;
    }
    out += "]";
    return out;
  }

  toBackwardString() {
    let out = "[";
    let current = this.tail;
    while (current !== null) {
      out += String(current.value);
      if (current.previous !== null) {
        out += ", ";
      }
      current = current.previous;
    }
    out += "]";
    return out;
  }

  _isSameValue(left, right) {
    return left === right;
  }
}

module.exports = DoublyLinkedList;
