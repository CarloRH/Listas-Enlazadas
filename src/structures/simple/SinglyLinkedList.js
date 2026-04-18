const SimpleNode = require("./SimpleNode");

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  addFirst(value) {
    const newNode = new SimpleNode(value);
    newNode.next = this.head;
    this.head = newNode;
    if (this.tail === null) {
      this.tail = newNode;
    }
    this._size++;
  }

  addLast(value) {
    const newNode = new SimpleNode(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
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
    let current = this.head;          // empezar desde el principio

    while (current !== null) {        // mientras haya nodos
      if (this._isSameValue(current.value, value)) {
        count++;                      // coincidencia → sumar
      }
      current = current.next;         // avanzar al siguiente
    }

    return count;                     // devolver el resultado
  }

  clean() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  reverseInPlace() {
    let prev = null;
    let current = this.tail = this.head; // tail será el antiguo head

    while (current !== null) {
      const next = current.next;  // 1. guardar el siguiente ANTES de romper enlace
      current.next = prev;        // 2. invertir el puntero
      prev = current;             // 3. avanzar prev
      current = next;             // 4. avanzar current
    }

    this.head = prev;             // el nuevo head es el último nodo visitado
  }

  removeDuplicates() {
    let current = this.head;

    while (current !== null) {
      let runner = current;           // runner parte desde current

      while (runner.next !== null) {
        if (this._isSameValue(runner.next.value, current.value)) {
          // duplicado encontrado: saltarlo
          if (runner.next === this.tail) {
            this.tail = runner;       // actualizar tail si eliminamos el último
          }
          runner.next = runner.next.next; // desconectar el nodo duplicado
          this._size--;
        } else {
          runner = runner.next;       // no es duplicado, avanzar runner
        }
      }

      current = current.next;         // avanzar current al siguiente único
    }
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  toString() {
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

  _isSameValue(left, right) {
    return left === right;
  }
}

module.exports = SinglyLinkedList;
