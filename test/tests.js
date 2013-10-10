// Tests largely based on those of Esprima
// (http://esprima.org/test/)

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
  var testAssert = require("./driver.js").testAssert;
}

test("this\n", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "ThisExpression",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("null\n", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: null,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("\n    42\n\n", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 4
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 4
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("(1 + 2 ) * 3", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Literal",
            value: 1,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          operator: "+",
          right: {
            type: "Literal",
            value: 2,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        operator: "*",
        right: {
          type: "Literal",
          value: 3,
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 12
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 12
    }
  }
});

test("x = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x = [ ]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x = [ 42 ]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [
            {
              type: "Literal",
              value: 42,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 10
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 10
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 10
    }
  }
});

test("x = [ 42, ]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [
            {
              type: "Literal",
              value: 42,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("x = [ ,, 42 ]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [
            null,
            null,
            {
              type: "Literal",
              value: 42,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("x = [ 1, 2, 3, ]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [
            {
              type: "Literal",
              value: 1,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            {
              type: "Literal",
              value: 2,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            {
              type: "Literal",
              value: 3,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 16
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("x = [ 1, 2,, 3, ]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [
            {
              type: "Literal",
              value: 1,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            {
              type: "Literal",
              value: 2,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            null,
            {
              type: "Literal",
              value: 3,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 17
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 17
    }
  }
});

test("日本語 = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "日本語",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 3
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("T‿ = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "T‿",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("T‌ = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "T‌",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("T‍ = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "T‍",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("ⅣⅡ = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "ⅣⅡ",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("ⅣⅡ = []", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "ⅣⅡ",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        right: {
          type: "ArrayExpression",
          elements: [],
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x = {}", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x = { }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x = { answer: 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "answer",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 18
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 18
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 18
    }
  }
});

test("x = { if: 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "if",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("x = { true: 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "true",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 16
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("x = { false: 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "false",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 17
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 17
    }
  }
});

test("x = { null: 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "null",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 16
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("x = { \"answer\": 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Literal",
                value: "answer",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 20
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 20
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 20
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 20
    }
  }
});

test("x = { x: 1, x: 2 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              value: {
                type: "Literal",
                value: 1,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              kind: "init"
            },
            {
              key: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              value: {
                type: "Literal",
                value: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 18
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 18
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 18
    }
  }
});

test("x = { get width() { return m_width } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "width",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ReturnStatement",
                      argument: {
                        type: "Identifier",
                        name: "m_width",
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 38
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 38
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 38
    }
  }
});

test("x = { get undef() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "undef",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 22
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("x = { get if() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "if",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 19
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 19
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 19
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 19
    }
  }
});

test("x = { get true() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "true",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 21
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 21
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  }
});

test("x = { get false() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "false",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 22
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("x = { get null() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "null",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 21
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 21
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  }
});

test("x = { get \"undef\"() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Literal",
                value: "undef",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 24
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 24
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  }
});

test("x = { get 10() {} }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Literal",
                value: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 19
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 19
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 19
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 19
    }
  }
});

test("x = { set width(w) { m_width = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "width",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_width",
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 36
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 36
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 36
    }
  }
});

test("x = { set if(w) { m_if = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "if",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_if",
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 22
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 30
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 30
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 30
    }
  }
});

test("x = { set true(w) { m_true = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "true",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_true",
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 34
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 34
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 34
    }
  }
});

test("x = { set false(w) { m_false = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "false",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_false",
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 36
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 36
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 36
    }
  }
});

test("x = { set null(w) { m_null = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "null",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_null",
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 34
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 34
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 34
    }
  }
});

test("x = { set \"null\"(w) { m_null = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Literal",
                value: "null",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_null",
                          loc: {
                            start: {
                              line: 1,
                              column: 22
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 36
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 36
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 36
    }
  }
});

test("x = { set 10(w) { m_null = w } }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Literal",
                value: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "w",
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "Identifier",
                          name: "m_null",
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          }
                        },
                        right: {
                          type: "Identifier",
                          name: "w",
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 32
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 32
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 32
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 32
    }
  }
});

test("x = { get: 42 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "get",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              value: {
                type: "Literal",
                value: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 15
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 15
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  }
});

test("x = { set: 43 }", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [
            {
              key: {
                type: "Identifier",
                name: "set",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              value: {
                type: "Literal",
                value: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              kind: "init"
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 15
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 15
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  }
});

test("/* block comment */ 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 1,
            column: 20
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 20
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 20
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("42 /*The*/ /*Answer*/", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("42 /*the*/ /*answer*/", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("/* multiline\ncomment\nshould\nbe\nignored */ 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 5,
            column: 11
          },
          end: {
            line: 5,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 5,
          column: 11
        },
        end: {
          line: 5,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 5,
      column: 11
    },
    end: {
      line: 5,
      column: 13
    }
  }
});

test("/*a\r\nb*/ 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 4
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 4
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("/*a\rb*/ 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 4
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 4
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("/*a\nb*/ 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 4
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 4
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("/*a\nc*/ 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 4
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 4
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("// line comment\n42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 0
          },
          end: {
            line: 2,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 2,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 0
    },
    end: {
      line: 2,
      column: 2
    }
  }
});

test("42 // line comment", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("// Hello, world!\n42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 0
          },
          end: {
            line: 2,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 2,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 0
    },
    end: {
      line: 2,
      column: 2
    }
  }
});

test("// Hello, world!\n", {
  type: "Program",
  body: [],
  loc: {
    start: {
      line: 2,
      column: 0
    },
    end: {
      line: 2,
      column: 0
    }
  }
});

test("// Hallo, world!\n", {
  type: "Program",
  body: [],
  loc: {
    start: {
      line: 2,
      column: 0
    },
    end: {
      line: 2,
      column: 0
    }
  }
});

test("//\n42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 2,
            column: 0
          },
          end: {
            line: 2,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 2,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 2,
      column: 0
    },
    end: {
      line: 2,
      column: 2
    }
  }
});

test("//", {
  type: "Program",
  body: [],
  loc: {
    start: {
      line: 1,
      column: 2
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("// ", {
  type: "Program",
  body: [],
  loc: {
    start: {
      line: 1,
      column: 3
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("/**/42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 4
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 4
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("// Hello, world!\n\n//   Another hello\n42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 4,
            column: 0
          },
          end: {
            line: 4,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 4,
          column: 0
        },
        end: {
          line: 4,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 4,
      column: 0
    },
    end: {
      line: 4,
      column: 2
    }
  }
});

test("if (x) { // Some comment\ndoThat(); }", {
  type: "Program",
  body: [
    {
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      consequent: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "doThat",
                loc: {
                  start: {
                    line: 2,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 6
                  }
                }
              },
              arguments: [],
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 8
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 9
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 2,
            column: 11
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 11
    }
  }
});

test("switch (answer) { case 42: /* perfect */ bingo() }", {
  type: "Program",
  body: [
    {
      type: "SwitchStatement",
      discriminant: {
        type: "Identifier",
        name: "answer",
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      cases: [
        {
          type: "SwitchCase",
          consequent: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "bingo",
                  loc: {
                    start: {
                      line: 1,
                      column: 41
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                },
                arguments: [],
                loc: {
                  start: {
                    line: 1,
                    column: 41
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 41
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            }
          ],
          test: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 48
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 50
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 50
    }
  }
});

test("0", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 0,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 1
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 1
    }
  }
});

test("3", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 3,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 1
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 1
    }
  }
});

test("5", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 5,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 1
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 1
    }
  }
});

test("42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test(".14", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 0.14,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("3.14159", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 3.14159,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("6.02214179e+23", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 6.02214179e+23,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("1.492417830e-10", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 1.49241783e-10,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 15
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  }
});

test("0x0", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 0,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("0e+100", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 0,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("0xabc", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 2748,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("0xdef", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 3567,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("0X1A", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("0x10", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 16,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("0x100", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 256,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("0X04", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 4,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("02", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 2,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("012", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 10,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("0012", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: 10,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("\"Hello\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("\"\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "\n\r\t\u000b\b\f\\'\"\u0000",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("\"\\u0061\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "a",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("\"\\x61\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "a",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("\"Hello\\nworld\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello\nworld",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("\"Hello\\\nworld\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Helloworld",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("\"Hello\\02World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello\u0002World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 15
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  }
});

test("\"Hello\\012World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello\nWorld",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("\"Hello\\122World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "HelloRWorld",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("\"Hello\\0122World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello\n2World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 17
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 17
    }
  }
});

test("\"Hello\\312World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "HelloÊWorld",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("\"Hello\\412World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello!2World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("\"Hello\\812World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello812World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("\"Hello\\712World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello92World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("\"Hello\\0World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello\u0000World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("\"Hello\\\r\nworld\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Helloworld",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 6
    }
  }
});

test("\"Hello\\1World\"", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "Hello\u0001World",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("var x = /[a-z]/i", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 16
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("var x = /[x-z]/i", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 16
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("var x = /[a-c]/i", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 16
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("var x = /[P QR]/i", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 17
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 17
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 17
    }
  }
});

test("var x = /foo\\/bar/", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 18
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 18
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 18
    }
  }
});

test("var x = /=([^=\\s])+/g", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 21
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  }
});

test("var x = /[P QR]/\\u0067", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: {},
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 22
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 22
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("new Button", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "NewExpression",
        callee: {
          type: "Identifier",
          name: "Button",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 10
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 10
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 10
    }
  }
});

test("new Button()", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "NewExpression",
        callee: {
          type: "Identifier",
          name: "Button",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 10
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 12
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 12
    }
  }
});

test("new new foo", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "NewExpression",
        callee: {
          type: "NewExpression",
          callee: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("new new foo()", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "NewExpression",
        callee: {
          type: "NewExpression",
          callee: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("new foo().bar()", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: {
            type: "NewExpression",
            callee: {
              type: "Identifier",
              name: "foo",
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            arguments: [],
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          property: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          computed: false,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 15
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  }
});

test("new foo[bar]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "NewExpression",
        callee: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 7
              }
            }
          },
          property: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          computed: true,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 12
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 12
    }
  }
});

test("new foo.bar()", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "NewExpression",
        callee: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 7
              }
            }
          },
          property: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          computed: false,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("( new foo).bar()", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: {
            type: "NewExpression",
            callee: {
              type: "Identifier",
              name: "foo",
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            arguments: [],
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          property: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 14
              }
            }
          },
          computed: false,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 16
    }
  }
});

test("foo(bar, baz)", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "foo",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 3
            }
          }
        },
        arguments: [
          {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 7
              }
            }
          },
          {
            type: "Identifier",
            name: "baz",
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 12
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("(    foo  )()", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "foo",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        arguments: [],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("universe.milkyway", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "Identifier",
          name: "milkyway",
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 17
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 17
    }
  }
});

test("universe.milkyway.solarsystem", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "universe",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          property: {
            type: "Identifier",
            name: "milkyway",
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          computed: false,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        property: {
          type: "Identifier",
          name: "solarsystem",
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 29
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 29
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 29
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 29
    }
  }
});

test("universe.milkyway.solarsystem.Earth", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "universe",
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            },
            property: {
              type: "Identifier",
              name: "milkyway",
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            computed: false,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          property: {
            type: "Identifier",
            name: "solarsystem",
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 29
              }
            }
          },
          computed: false,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 29
            }
          }
        },
        property: {
          type: "Identifier",
          name: "Earth",
          loc: {
            start: {
              line: 1,
              column: 30
            },
            end: {
              line: 1,
              column: 35
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 35
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 35
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 35
    }
  }
});

test("universe[galaxyName, otherUselessName]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "SequenceExpression",
          expressions: [
            {
              type: "Identifier",
              name: "galaxyName",
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            {
              type: "Identifier",
              name: "otherUselessName",
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 37
            }
          }
        },
        computed: true,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 38
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 38
    }
  }
});

test("universe[galaxyName]", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "Identifier",
          name: "galaxyName",
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 19
            }
          }
        },
        computed: true,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 20
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 20
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 20
    }
  }
});

test("universe[42].galaxies", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "universe",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          property: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          computed: true,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        property: {
          type: "Identifier",
          name: "galaxies",
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 21
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 21
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  }
});

test("universe(42).galaxies", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "universe",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          arguments: [
            {
              type: "Literal",
              value: 42,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        property: {
          type: "Identifier",
          name: "galaxies",
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 21
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 21
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  }
});

test("universe(42).galaxies(14, 3, 77).milkyway", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "universe",
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              arguments: [
                {
                  type: "Literal",
                  value: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            property: {
              type: "Identifier",
              name: "galaxies",
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            computed: false,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          arguments: [
            {
              type: "Literal",
              value: 14,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            {
              type: "Literal",
              value: 3,
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            {
              type: "Literal",
              value: 77,
              loc: {
                start: {
                  line: 1,
                  column: 29
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 32
            }
          }
        },
        property: {
          type: "Identifier",
          name: "milkyway",
          loc: {
            start: {
              line: 1,
              column: 33
            },
            end: {
              line: 1,
              column: 41
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 41
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 41
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 41
    }
  }
});

test("earth.asia.Indonesia.prepareForElection(2014)", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: {
            type: "MemberExpression",
            object: {
              type: "MemberExpression",
              object: {
                type: "Identifier",
                name: "earth",
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 5
                  }
                }
              },
              property: {
                type: "Identifier",
                name: "asia",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              computed: false,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            property: {
              type: "Identifier",
              name: "Indonesia",
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            computed: false,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          property: {
            type: "Identifier",
            name: "prepareForElection",
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 39
              }
            }
          },
          computed: false,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 39
            }
          }
        },
        arguments: [
          {
            type: "Literal",
            value: 2014,
            loc: {
              start: {
                line: 1,
                column: 40
              },
              end: {
                line: 1,
                column: 44
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 45
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 45
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 45
    }
  }
});

test("universe.if", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "Identifier",
          name: "if",
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("universe.true", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "Identifier",
          name: "true",
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("universe.false", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "Identifier",
          name: "false",
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("universe.null", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "universe",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        property: {
          type: "Identifier",
          name: "null",
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        computed: false,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("x++", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("x--", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "--",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("eval++", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 4
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("eval--", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "--",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 4
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("arguments++", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "arguments",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("arguments--", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "--",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "arguments",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("++x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "++",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 3
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("--x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "--",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 3
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 3
    }
  }
});

test("++eval", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "++",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("--eval", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "--",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("++arguments", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "++",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "arguments",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("--arguments", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UpdateExpression",
        operator: "--",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "arguments",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("+x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "+",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("-x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "-",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("~x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "~",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("!x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "!",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 1,
              column: 2
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("void x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "void",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("delete x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "delete",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("typeof x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "UnaryExpression",
        operator: "typeof",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("x * y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "*",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x / y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "/",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x % y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "%",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x + y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "+",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x - y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "-",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x << y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "<<",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x >> y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: ">>",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x >>> y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: ">>>",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x < y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "<",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x > y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: ">",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x <= y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "<=",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x >= y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: ">=",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x in y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "in",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x instanceof y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "instanceof",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("x < y < z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "<",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "<",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x == y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "==",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x != y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "!=",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x === y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "===",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x !== y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "!==",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x & y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "&",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x ^ y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "^",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x | y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "|",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("x + y + z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "+",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "+",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x - y + z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "-",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "+",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x + y - z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "+",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "-",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x - y - z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "-",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "-",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x + y * z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "+",
        right: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          operator: "*",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x + y / z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "+",
        right: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          operator: "/",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x - y % z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "-",
        right: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          operator: "%",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x * y * z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "*",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "*",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x * y / z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "*",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "/",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x * y % z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "*",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "%",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x % y * z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "%",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "*",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x << y << z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "<<",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        operator: "<<",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("x | y | z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "|",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "|",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x & y & z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "&",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "&",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x ^ y ^ z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "^",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "^",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x & y | z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "&",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        operator: "|",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x | y ^ z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "|",
        right: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          operator: "^",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x | y & z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "|",
        right: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          operator: "&",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x || y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "LogicalExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "||",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x && y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "LogicalExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "&&",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("x || y || z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "LogicalExpression",
        left: {
          type: "LogicalExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "||",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        operator: "||",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("x && y && z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "LogicalExpression",
        left: {
          type: "LogicalExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "&&",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        operator: "&&",
        right: {
          type: "Identifier",
          name: "z",
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("x || y && z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "LogicalExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "||",
        right: {
          type: "LogicalExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          operator: "&&",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("x || y ^ z", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "LogicalExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "||",
        right: {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          operator: "^",
          right: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 10
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 10
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 10
    }
  }
});

test("y ? 1 : 2", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "ConditionalExpression",
        test: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        consequent: {
          type: "Literal",
          value: 1,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        alternate: {
          type: "Literal",
          value: 2,
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x && y ? 1 : 2", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "ConditionalExpression",
        test: {
          type: "LogicalExpression",
          left: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          operator: "&&",
          right: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        consequent: {
          type: "Literal",
          value: 1,
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 10
            }
          }
        },
        alternate: {
          type: "Literal",
          value: 2,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("x = 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("eval = 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 4
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("arguments = 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "arguments",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 12
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("x *= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "*=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x /= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "/=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x %= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "%=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x += 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "+=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x -= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "-=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x <<= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "<<=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("x >>= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: ">>=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("x >>>= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: ">>>=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("x &= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "&=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x ^= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "^=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("x |= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "|=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("{ foo }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 5
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("{ doThis(); doThat(); }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "doThis",
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            },
            arguments: [],
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "doThat",
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            arguments: [],
            loc: {
              start: {
                line: 1,
                column: 12
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 12
            },
            end: {
              line: 1,
              column: 21
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 23
    }
  }
});

test("{}", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 2
    }
  }
});

test("var x", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  }
});

test("var x, y;", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 8
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("var x = 42", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 10
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 10
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 10
    }
  }
});

test("var eval = 42, arguments = 42", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "eval",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          init: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "arguments",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          init: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 27
              },
              end: {
                line: 1,
                column: 29
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 29
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 29
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 29
    }
  }
});

test("var x = 14, y = 3, z = 1977", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: {
            type: "Literal",
            value: 14,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 10
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 12
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          init: {
            type: "Literal",
            value: 3,
            loc: {
              start: {
                line: 1,
                column: 16
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 12
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 1,
                column: 19
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          init: {
            type: "Literal",
            value: 1977,
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 27
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 27
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 27
    }
  }
});

test("var implements, interface, package", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "implements",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 14
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "interface",
            loc: {
              start: {
                line: 1,
                column: 16
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 16
            },
            end: {
              line: 1,
              column: 25
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "package",
            loc: {
              start: {
                line: 1,
                column: 27
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 27
            },
            end: {
              line: 1,
              column: 34
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 34
    }
  }
});

test("var private, protected, public, static", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "private",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "protected",
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 22
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 22
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "public",
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 30
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 24
            },
            end: {
              line: 1,
              column: 30
            }
          }
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "static",
            loc: {
              start: {
                line: 1,
                column: 32
              },
              end: {
                line: 1,
                column: 38
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 32
            },
            end: {
              line: 1,
              column: 38
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 38
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 38
    }
  }
});

test(";", {
  type: "Program",
  body: [
    {
      type: "EmptyStatement",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 1
    }
  }
});

test("x", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 1
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 1
    }
  }
});

test("x, y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "SequenceExpression",
        expressions: [
          {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          {
            type: "Identifier",
            name: "y",
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 4
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 4
    }
  }
});

test("\\u0061", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "a",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
});

test("a\\u0061", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "aa",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 7
    }
  }
});

test("if (morning) goodMorning()", {
  type: "Program",
  body: [
    {
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "morning",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      consequent: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "goodMorning",
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 26
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 26
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  }
});

test("if (morning) (function(){})", {
  type: "Program",
  body: [
    {
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "morning",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      consequent: {
        type: "ExpressionStatement",
        expression: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 26
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 27
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 27
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 27
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 27
    }
  }
});

test("if (morning) var x = 0;", {
  type: "Program",
  body: [
    {
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "morning",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      consequent: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            init: {
              type: "Literal",
              value: 0,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 17
              },
              end: {
                line: 1,
                column: 22
              }
            }
          }
        ],
        kind: "var",
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 23
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 23
    }
  }
});

test("if (morning) function a(){}", {
  type: "Program",
  body: [
    {
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "morning",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      consequent: {
        type: "FunctionDeclaration",
        id: {
          type: "Identifier",
          name: "a",
          loc: {
            start: {
              line: 1,
              column: 22
            },
            end: {
              line: 1,
              column: 23
            }
          }
        },
        params: [],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {
              line: 1,
              column: 25
            },
            end: {
              line: 1,
              column: 27
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 27
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 27
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 27
    }
  }
});

test("if (morning) goodMorning(); else goodDay()", {
  type: "Program",
  body: [
    {
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "morning",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      consequent: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "goodMorning",
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 26
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 27
          }
        }
      },
      alternate: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "goodDay",
            loc: {
              start: {
                line: 1,
                column: 33
              },
              end: {
                line: 1,
                column: 40
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 33
            },
            end: {
              line: 1,
              column: 42
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 33
          },
          end: {
            line: 1,
            column: 42
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 42
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 42
    }
  }
});

test("do keep(); while (true)", {
  type: "Program",
  body: [
    {
      type: "DoWhileStatement",
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "keep",
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 7
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 3
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 3
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 18
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 23
    }
  }
});

test("do keep(); while (true);", {
  type: "Program",
  body: [
    {
      type: "DoWhileStatement",
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "keep",
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 7
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 3
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 3
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 18
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  }
});

test("do { x++; y--; } while (x < 10)", {
  type: "Program",
  body: [
    {
      type: "DoWhileStatement",
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "UpdateExpression",
              operator: "++",
              prefix: false,
              argument: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "UpdateExpression",
              operator: "--",
              prefix: false,
              argument: {
                type: "Identifier",
                name: "y",
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 14
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 3
          },
          end: {
            line: 1,
            column: 16
          }
        }
      },
      test: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 24
            },
            end: {
              line: 1,
              column: 25
            }
          }
        },
        operator: "<",
        right: {
          type: "Literal",
          value: 10,
          loc: {
            start: {
              line: 1,
              column: 28
            },
            end: {
              line: 1,
              column: 30
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 24
          },
          end: {
            line: 1,
            column: 30
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 31
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 31
    }
  }
});

test("{ do { } while (false);false }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "DoWhileStatement",
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          test: {
            type: "Literal",
            value: false,
            loc: {
              start: {
                line: 1,
                column: 16
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 23
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: false,
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 28
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 23
            },
            end: {
              line: 1,
              column: 28
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 30
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 30
    }
  }
});

test("while (true) doSomething()", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "doSomething",
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          arguments: [],
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 26
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 26
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  }
});

test("while (x < 10) { x++; y--; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        operator: "<",
        right: {
          type: "Literal",
          value: 10,
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "UpdateExpression",
              operator: "++",
              prefix: false,
              argument: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 17
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "UpdateExpression",
              operator: "--",
              prefix: false,
              argument: {
                type: "Identifier",
                name: "y",
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 26
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 28
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 28
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 28
    }
  }
});

test("for(;;);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: null,
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("for(;;){}", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: null,
      test: null,
      update: null,
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("for(x = 0;;);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        right: {
          type: "Literal",
          value: 0,
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        loc: {
          start: {
            line: 1,
            column: 12
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("for(var x = 0;;);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            init: {
              type: "Literal",
              value: 0,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 13
              }
            }
          }
        ],
        kind: "var",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        loc: {
          start: {
            line: 1,
            column: 16
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 17
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 17
    }
  }
});

test("for(var x = 0, y = 1;;);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            init: {
              type: "Literal",
              value: 0,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "y",
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            init: {
              type: "Literal",
              value: 1,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 20
              }
            }
          }
        ],
        kind: "var",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 20
          }
        }
      },
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        loc: {
          start: {
            line: 1,
            column: 23
          },
          end: {
            line: 1,
            column: 24
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  }
});

test("for(x = 0; x < 42;);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        right: {
          type: "Literal",
          value: 0,
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      test: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        operator: "<",
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 11
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      update: null,
      body: {
        type: "EmptyStatement",
        loc: {
          start: {
            line: 1,
            column: 19
          },
          end: {
            line: 1,
            column: 20
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 20
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 20
    }
  }
});

test("for(x = 0; x < 42; x++);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        right: {
          type: "Literal",
          value: 0,
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      test: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        operator: "<",
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 11
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      update: {
        type: "UpdateExpression",
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 20
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 19
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      body: {
        type: "EmptyStatement",
        loc: {
          start: {
            line: 1,
            column: 23
          },
          end: {
            line: 1,
            column: 24
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  }
});

test("for(x = 0; x < 42; x++) process(x);", {
  type: "Program",
  body: [
    {
      type: "ForStatement",
      init: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        right: {
          type: "Literal",
          value: 0,
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      test: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 12
            }
          }
        },
        operator: "<",
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 11
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      update: {
        type: "UpdateExpression",
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 20
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 19
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "process",
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          arguments: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 32
                },
                end: {
                  line: 1,
                  column: 33
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 24
            },
            end: {
              line: 1,
              column: 34
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 24
          },
          end: {
            line: 1,
            column: 35
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 35
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 35
    }
  }
});

test("for(x in list) process(x);", {
  type: "Program",
  body: [
    {
      type: "ForInStatement",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      right: {
        type: "Identifier",
        name: "list",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "process",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 22
              }
            }
          },
          arguments: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 23
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 25
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 26
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  }
});

test("for (var x in list) process(x);", {
  type: "Program",
  body: [
    {
      type: "ForInStatement",
      left: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            init: null,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 10
              }
            }
          }
        ],
        kind: "var",
        loc: {
          start: {
            line: 1,
            column: 5
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      right: {
        type: "Identifier",
        name: "list",
        loc: {
          start: {
            line: 1,
            column: 14
          },
          end: {
            line: 1,
            column: 18
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "process",
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          arguments: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 28
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 20
            },
            end: {
              line: 1,
              column: 30
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 20
          },
          end: {
            line: 1,
            column: 31
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 31
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 31
    }
  }
});

test("for (var x = 42 in list) process(x);", {
  type: "Program",
  body: [
    {
      type: "ForInStatement",
      left: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            init: {
              type: "Literal",
              value: 42,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 15
              }
            }
          }
        ],
        kind: "var",
        loc: {
          start: {
            line: 1,
            column: 5
          },
          end: {
            line: 1,
            column: 15
          }
        }
      },
      right: {
        type: "Identifier",
        name: "list",
        loc: {
          start: {
            line: 1,
            column: 19
          },
          end: {
            line: 1,
            column: 23
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "process",
            loc: {
              start: {
                line: 1,
                column: 25
              },
              end: {
                line: 1,
                column: 32
              }
            }
          },
          arguments: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 33
                },
                end: {
                  line: 1,
                  column: 34
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 25
            },
            end: {
              line: 1,
              column: 35
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 25
          },
          end: {
            line: 1,
            column: 36
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 36
    }
  }
});

test("for (var i = function() { return 10 in [] } in list) process(x);", {
  type: "Program",
  body: [
    {
      type: "ForInStatement",
      left: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "i",
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            init: {
              type: "FunctionExpression",
              id: null,
              params: [],
              body: {
                type: "BlockStatement",
                body: [
                  {
                    type: "ReturnStatement",
                    argument: {
                      type: "BinaryExpression",
                      left: {
                        type: "Literal",
                        value: 10,
                        loc: {
                          start: {
                            line: 1,
                            column: 33
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      },
                      operator: "in",
                      right: {
                        type: "ArrayExpression",
                        elements: [],
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 41
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  }
                ],
                loc: {
                  start: {
                    line: 1,
                    column: 24
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 43
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 43
              }
            }
          }
        ],
        kind: "var",
        loc: {
          start: {
            line: 1,
            column: 5
          },
          end: {
            line: 1,
            column: 43
          }
        }
      },
      right: {
        type: "Identifier",
        name: "list",
        loc: {
          start: {
            line: 1,
            column: 47
          },
          end: {
            line: 1,
            column: 51
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "process",
            loc: {
              start: {
                line: 1,
                column: 53
              },
              end: {
                line: 1,
                column: 60
              }
            }
          },
          arguments: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {
                  line: 1,
                  column: 61
                },
                end: {
                  line: 1,
                  column: 62
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 53
            },
            end: {
              line: 1,
              column: 63
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 53
          },
          end: {
            line: 1,
            column: 64
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 64
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 64
    }
  }
});

test("while (true) { continue; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ContinueStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 24
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 26
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  }
});

test("while (true) { continue }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ContinueStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 23
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 25
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 25
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 25
    }
  }
});

test("done: while (true) { continue done }", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "WhileStatement",
        test: {
          type: "Literal",
          value: true,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ContinueStatement",
              label: {
                type: "Identifier",
                name: "done",
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 34
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 36
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 36
          }
        }
      },
      label: {
        type: "Identifier",
        name: "done",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 36
    }
  }
});

test("done: while (true) { continue done; }", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "WhileStatement",
        test: {
          type: "Literal",
          value: true,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ContinueStatement",
              label: {
                type: "Identifier",
                name: "done",
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 37
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 37
          }
        }
      },
      label: {
        type: "Identifier",
        name: "done",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 37
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 37
    }
  }
});

test("while (true) { break }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "BreakStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 20
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("done: while (true) { break done }", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "WhileStatement",
        test: {
          type: "Literal",
          value: true,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "BreakStatement",
              label: {
                type: "Identifier",
                name: "done",
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 33
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 33
          }
        }
      },
      label: {
        type: "Identifier",
        name: "done",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 33
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 33
    }
  }
});

test("done: while (true) { break done; }", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "WhileStatement",
        test: {
          type: "Literal",
          value: true,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 17
            }
          }
        },
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "BreakStatement",
              label: {
                type: "Identifier",
                name: "done",
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 34
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 34
          }
        }
      },
      label: {
        type: "Identifier",
        name: "done",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 34
    }
  }
});

test("(function(){ return })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: null,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 21
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("(function(){ return; })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: null,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 22
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 23
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 23
    }
  }
});

test("(function(){ return x; })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 24
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 25
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 25
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 25
    }
  }
});

test("(function(){ return x * y })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: {
                type: "BinaryExpression",
                left: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                operator: "*",
                right: {
                  type: "Identifier",
                  name: "y",
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 27
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 28
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 28
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 28
    }
  }
});

test("with (x) foo = bar", {
  type: "Program",
  body: [
    {
      type: "WithStatement",
      object: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
          right: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 18
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 18
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 18
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 18
    }
  }
});

test("with (x) foo = bar;", {
  type: "Program",
  body: [
    {
      type: "WithStatement",
      object: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
          right: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 18
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 18
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 19
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 19
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 19
    }
  }
});

test("with (x) { foo = bar }", {
  type: "Program",
  body: [
    {
      type: "WithStatement",
      object: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "AssignmentExpression",
              operator: "=",
              left: {
                type: "Identifier",
                name: "foo",
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              right: {
                type: "Identifier",
                name: "bar",
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 20
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 22
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 22
    }
  }
});

test("switch (x) {}", {
  type: "Program",
  body: [
    {
      type: "SwitchStatement",
      discriminant: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 1,
            column: 9
          }
        }
      },
      cases: [],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  }
});

test("switch (answer) { case 42: hi(); break; }", {
  type: "Program",
  body: [
    {
      type: "SwitchStatement",
      discriminant: {
        type: "Identifier",
        name: "answer",
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      cases: [
        {
          type: "SwitchCase",
          consequent: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "hi",
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                arguments: [],
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 27
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            {
              type: "BreakStatement",
              label: null,
              loc: {
                start: {
                  line: 1,
                  column: 33
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            }
          ],
          test: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 39
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 41
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 41
    }
  }
});

test("switch (answer) { case 42: hi(); break; default: break }", {
  type: "Program",
  body: [
    {
      type: "SwitchStatement",
      discriminant: {
        type: "Identifier",
        name: "answer",
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      cases: [
        {
          type: "SwitchCase",
          consequent: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "hi",
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                arguments: [],
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 27
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            {
              type: "BreakStatement",
              label: null,
              loc: {
                start: {
                  line: 1,
                  column: 33
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            }
          ],
          test: {
            type: "Literal",
            value: 42,
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 39
            }
          }
        },
        {
          type: "SwitchCase",
          consequent: [
            {
              type: "BreakStatement",
              label: null,
              loc: {
                start: {
                  line: 1,
                  column: 49
                },
                end: {
                  line: 1,
                  column: 54
                }
              }
            }
          ],
          test: null,
          loc: {
            start: {
              line: 1,
              column: 40
            },
            end: {
              line: 1,
              column: 54
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 56
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 56
    }
  }
});

test("start: for (;;) break start", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "ForStatement",
        init: null,
        test: null,
        update: null,
        body: {
          type: "BreakStatement",
          label: {
            type: "Identifier",
            name: "start",
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 16
            },
            end: {
              line: 1,
              column: 27
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 27
          }
        }
      },
      label: {
        type: "Identifier",
        name: "start",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 27
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 27
    }
  }
});

test("start: while (true) break start", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "WhileStatement",
        test: {
          type: "Literal",
          value: true,
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 18
            }
          }
        },
        body: {
          type: "BreakStatement",
          label: {
            type: "Identifier",
            name: "start",
            loc: {
              start: {
                line: 1,
                column: 26
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 20
            },
            end: {
              line: 1,
              column: 31
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 31
          }
        }
      },
      label: {
        type: "Identifier",
        name: "start",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 31
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 31
    }
  }
});

test("throw x;", {
  type: "Program",
  body: [
    {
      type: "ThrowStatement",
      argument: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
});

test("throw x * y", {
  type: "Program",
  body: [
    {
      type: "ThrowStatement",
      argument: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 7
            }
          }
        },
        operator: "*",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 11
    }
  }
});

test("throw { message: \"Error\" }", {
  type: "Program",
  body: [
    {
      type: "ThrowStatement",
      argument: {
        type: "ObjectExpression",
        properties: [
          {
            key: {
              type: "Identifier",
              name: "message",
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            value: {
              type: "Literal",
              value: "Error",
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            kind: "init"
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 26
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  }
});

test("try { } catch (e) { }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      handler: {
          type: "CatchClause",
          param: {
            type: "Identifier",
            name: "e",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          guard: null,
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 21
            }
          }
        }
      ,
      finalizer: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  }
});

test("try { } catch (eval) { }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      handler:
        {
          type: "CatchClause",
          param: {
            type: "Identifier",
            name: "eval",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 19
              }
            }
          },
          guard: null,
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 24
            }
          }
        }
      ,
      finalizer: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  }
});

test("try { } catch (arguments) { }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      handler:
        {
          type: "CatchClause",
          param: {
            type: "Identifier",
            name: "arguments",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          guard: null,
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {
                line: 1,
                column: 26
              },
              end: {
                line: 1,
                column: 29
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 29
            }
          }
        }
      ,
      finalizer: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 29
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 29
    }
  }
});

test("try { } catch (e) { say(e) }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      handler:
        {
          type: "CatchClause",
          param: {
            type: "Identifier",
            name: "e",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          guard: null,
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "say",
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    }
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      name: "e",
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              }
            ],
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 28
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 28
            }
          }
        }
      ,
      finalizer: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 28
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 28
    }
  }
});

test("try { } finally { cleanup(stuff) }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 7
          }
        }
      },
      handler: null,
      finalizer: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "cleanup",
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              arguments: [
                {
                  type: "Identifier",
                  name: "stuff",
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 32
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 16
          },
          end: {
            line: 1,
            column: 34
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 34
    }
  }
});

test("try { doThat(); } catch (e) { say(e) }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "doThat",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              arguments: [],
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 6
              },
              end: {
                line: 1,
                column: 15
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      handler:
        {
          type: "CatchClause",
          param: {
            type: "Identifier",
            name: "e",
            loc: {
              start: {
                line: 1,
                column: 25
              },
              end: {
                line: 1,
                column: 26
              }
            }
          },
          guard: null,
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "say",
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      name: "e",
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 30
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              }
            ],
            loc: {
              start: {
                line: 1,
                column: 28
              },
              end: {
                line: 1,
                column: 38
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 38
            }
          }
        }
      ,
      finalizer: null,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 38
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 38
    }
  }
});

test("try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }", {
  type: "Program",
  body: [
    {
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "doThat",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              arguments: [],
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 6
              },
              end: {
                line: 1,
                column: 15
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 4
          },
          end: {
            line: 1,
            column: 17
          }
        }
      },
      handler:
        {
          type: "CatchClause",
          param: {
            type: "Identifier",
            name: "e",
            loc: {
              start: {
                line: 1,
                column: 25
              },
              end: {
                line: 1,
                column: 26
              }
            }
          },
          guard: null,
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "say",
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      name: "e",
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 1,
                      column: 30
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                },
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              }
            ],
            loc: {
              start: {
                line: 1,
                column: 28
              },
              end: {
                line: 1,
                column: 38
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 38
            }
          }
        }
      ,
      finalizer: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "cleanup",
                loc: {
                  start: {
                    line: 1,
                    column: 49
                  },
                  end: {
                    line: 1,
                    column: 56
                  }
                }
              },
              arguments: [
                {
                  type: "Identifier",
                  name: "stuff",
                  loc: {
                    start: {
                      line: 1,
                      column: 57
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 1,
                  column: 49
                },
                end: {
                  line: 1,
                  column: 63
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 49
              },
              end: {
                line: 1,
                column: 63
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 47
          },
          end: {
            line: 1,
            column: 65
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 65
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 65
    }
  }
});

test("debugger;", {
  type: "Program",
  body: [
    {
      type: "DebuggerStatement",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 9
    }
  }
});

test("function hello() { sayHi(); }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "hello",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "sayHi",
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              arguments: [],
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 19
              },
              end: {
                line: 1,
                column: 27
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 17
          },
          end: {
            line: 1,
            column: 29
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 29
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 29
    }
  }
});

test("function eval() { }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "eval",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 16
          },
          end: {
            line: 1,
            column: 19
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 19
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 19
    }
  }
});

test("function arguments() { }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "arguments",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 18
          }
        }
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 21
          },
          end: {
            line: 1,
            column: 24
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  }
});

test("function test(t, t) { }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "test",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      params: [
        {
          type: "Identifier",
          name: "t",
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 15
            }
          }
        },
        {
          type: "Identifier",
          name: "t",
          loc: {
            start: {
              line: 1,
              column: 17
            },
            end: {
              line: 1,
              column: 18
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {
            line: 1,
            column: 20
          },
          end: {
            line: 1,
            column: 23
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 23
    }
  }
});

test("(function test(t, t) { })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: {
          type: "Identifier",
          name: "test",
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 14
            }
          }
        },
        params: [
          {
            type: "Identifier",
            name: "t",
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          {
            type: "Identifier",
            name: "t",
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 19
              }
            }
          }
        ],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {
              line: 1,
              column: 21
            },
            end: {
              line: 1,
              column: 24
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 25
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 25
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 25
    }
  }
});

test("function eval() { function inner() { \"use strict\" } }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "eval",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 13
          }
        }
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "inner",
              loc: {
                start: {
                  line: 1,
                  column: 27
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            params: [],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "Literal",
                    value: "use strict",
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 1,
                      column: 37
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 1,
                  column: 35
                },
                end: {
                  line: 1,
                  column: 51
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 51
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 16
          },
          end: {
            line: 1,
            column: 53
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 53
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 53
    }
  }
});

test("function hello(a) { sayHi(); }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "hello",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      params: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 16
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "sayHi",
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              arguments: [],
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 28
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 18
          },
          end: {
            line: 1,
            column: 30
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 30
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 30
    }
  }
});

test("function hello(a, b) { sayHi(); }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "hello",
        loc: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      params: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 16
            }
          }
        },
        {
          type: "Identifier",
          name: "b",
          loc: {
            start: {
              line: 1,
              column: 18
            },
            end: {
              line: 1,
              column: 19
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "sayHi",
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              arguments: [],
              loc: {
                start: {
                  line: 1,
                  column: 23
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 21
          },
          end: {
            line: 1,
            column: 33
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 33
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 33
    }
  }
});

test("var hi = function() { sayHi() };", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "hi",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          init: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name: "sayHi",
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      }
                    },
                    arguments: [],
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 31
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 32
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 32
    }
  }
});

test("var hi = function eval() { };", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "hi",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          init: {
            type: "FunctionExpression",
            id: {
              type: "Identifier",
              name: "eval",
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 28
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 28
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 28
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 29
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 29
    }
  }
});

test("var hi = function arguments() { };", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "hi",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          init: {
            type: "FunctionExpression",
            id: {
              type: "Identifier",
              name: "arguments",
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {
                  line: 1,
                  column: 30
                },
                end: {
                  line: 1,
                  column: 33
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 33
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 33
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 34
    }
  }
});

test("var hello = function hi() { sayHi() };", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "hello",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          init: {
            type: "FunctionExpression",
            id: {
              type: "Identifier",
              name: "hi",
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            params: [],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name: "sayHi",
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    arguments: [],
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            loc: {
              start: {
                line: 1,
                column: 12
              },
              end: {
                line: 1,
                column: 37
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 37
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 38
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 38
    }
  }
});

test("(function(){})", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 14
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 14
    }
  }
});

test("{ x\n++y }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 3
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 3
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UpdateExpression",
            operator: "++",
            prefix: true,
            argument: {
              type: "Identifier",
              name: "y",
              loc: {
                start: {
                  line: 2,
                  column: 2
                },
                end: {
                  line: 2,
                  column: 3
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 3
              }
            }
          },
          loc: {
            start: {
              line: 2,
              column: 0
            },
            end: {
              line: 2,
              column: 3
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 5
    }
  }
});

test("{ x\n--y }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 3
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 3
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UpdateExpression",
            operator: "--",
            prefix: true,
            argument: {
              type: "Identifier",
              name: "y",
              loc: {
                start: {
                  line: 2,
                  column: 2
                },
                end: {
                  line: 2,
                  column: 3
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 3
              }
            }
          },
          loc: {
            start: {
              line: 2,
              column: 0
            },
            end: {
              line: 2,
              column: 3
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 5
    }
  }
});

test("var x /* comment */;", {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          init: null,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 5
            }
          }
        }
      ],
      kind: "var",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 20
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 20
    }
  }
});

test("{ var x = 14, y = 3\nz; }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              init: {
                type: "Literal",
                value: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "y",
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              init: {
                type: "Literal",
                value: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            }
          ],
          kind: "var",
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 19
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "z",
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 1
              }
            }
          },
          loc: {
            start: {
              line: 2,
              column: 0
            },
            end: {
              line: 2,
              column: 2
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 4
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 4
    }
  }
});

test("while (true) { continue\nthere; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ContinueStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "there",
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 5
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 6
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 2,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 8
    }
  }
});

test("while (true) { continue // Comment\nthere; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ContinueStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "there",
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 5
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 6
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 2,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 8
    }
  }
});

test("while (true) { continue /* Multiline\nComment */there; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ContinueStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "there",
              loc: {
                start: {
                  line: 2,
                  column: 10
                },
                end: {
                  line: 2,
                  column: 15
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 10
              },
              end: {
                line: 2,
                column: 16
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 2,
            column: 18
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 18
    }
  }
});

test("while (true) { break\nthere; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "BreakStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "there",
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 5
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 6
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 2,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 8
    }
  }
});

test("while (true) { break // Comment\nthere; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "BreakStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "there",
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 5
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 6
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 2,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 8
    }
  }
});

test("while (true) { break /* Multiline\nComment */there; }", {
  type: "Program",
  body: [
    {
      type: "WhileStatement",
      test: {
        type: "Literal",
        value: true,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "BreakStatement",
            label: null,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "there",
              loc: {
                start: {
                  line: 2,
                  column: 10
                },
                end: {
                  line: 2,
                  column: 15
                }
              }
            },
            loc: {
              start: {
                line: 2,
                column: 10
              },
              end: {
                line: 2,
                column: 16
              }
            }
          }
        ],
        loc: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 2,
            column: 18
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 18
    }
  }
});

test("(function(){ return\nx; })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: null,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            {
              type: "ExpressionStatement",
              expression: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 2,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 1
                  }
                }
              },
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 2
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 2,
              column: 4
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 5
    }
  }
});

test("(function(){ return // Comment\nx; })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: null,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            {
              type: "ExpressionStatement",
              expression: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 2,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 1
                  }
                }
              },
              loc: {
                start: {
                  line: 2,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 2
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 2,
              column: 4
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 5
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 5
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 5
    }
  }
});

test("(function(){ return/* Multiline\nComment */x; })", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "FunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: null,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            {
              type: "ExpressionStatement",
              expression: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {
                    line: 2,
                    column: 10
                  },
                  end: {
                    line: 2,
                    column: 11
                  }
                }
              },
              loc: {
                start: {
                  line: 2,
                  column: 10
                },
                end: {
                  line: 2,
                  column: 12
                }
              }
            }
          ],
          loc: {
            start: {
              line: 1,
              column: 11
            },
            end: {
              line: 2,
              column: 14
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 15
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 15
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 15
    }
  }
});

test("{ throw error\nerror; }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ThrowStatement",
          argument: {
            type: "Identifier",
            name: "error",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "error",
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 2,
              column: 0
            },
            end: {
              line: 2,
              column: 6
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 8
    }
  }
});

test("{ throw error// Comment\nerror; }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ThrowStatement",
          argument: {
            type: "Identifier",
            name: "error",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "error",
            loc: {
              start: {
                line: 2,
                column: 0
              },
              end: {
                line: 2,
                column: 5
              }
            }
          },
          loc: {
            start: {
              line: 2,
              column: 0
            },
            end: {
              line: 2,
              column: 6
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 8
    }
  }
});

test("{ throw error/* Multiline\nComment */error; }", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: [
        {
          type: "ThrowStatement",
          argument: {
            type: "Identifier",
            name: "error",
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 13
              }
            }
          },
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 13
            }
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Identifier",
            name: "error",
            loc: {
              start: {
                line: 2,
                column: 10
              },
              end: {
                line: 2,
                column: 15
              }
            }
          },
          loc: {
            start: {
              line: 2,
              column: 10
            },
            end: {
              line: 2,
              column: 16
            }
          }
        }
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 18
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 2,
      column: 18
    }
  }
});

test("", {
  type: "Program",
  body: [],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 0
    }
  }
});

test("foo: if (true) break foo;", {
  type: "Program",
  start: 0,
  end: 25,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 25
    }
  },
  body: [
    {
      type: "LabeledStatement",
      start: 0,
      end: 25,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 25
        }
      },
      body: {
        type: "IfStatement",
        start: 5,
        end: 25,
        loc: {
          start: {
            line: 1,
            column: 5
          },
          end: {
            line: 1,
            column: 25
          }
        },
        test: {
          type: "Literal",
          start: 9,
          end: 13,
          loc: {
            start: {
              line: 1,
              column: 9
            },
            end: {
              line: 1,
              column: 13
            }
          },
          value: true
        },
        consequent: {
          type: "BreakStatement",
          start: 15,
          end: 25,
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 25
            }
          },
          label: {
            type: "Identifier",
            start: 21,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 24
              }
            },
            name: "foo"
          }
        },
        alternate: null
      },
      label: {
        type: "Identifier",
        start: 0,
        end: 3,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 3
          }
        },
        name: "foo"
      }
    }
  ]
});

test("(function () {\n 'use strict';\n '\0';\n}())", {
  type: "Program",
  start: 0,
  end: 40,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 4,
      column: 4
    }
  },
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 40,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 4,
          column: 4
        }
      },
      expression: {
        type: "CallExpression",
        start: 0,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 4,
            column: 4
          }
        },
        callee: {
          type: "FunctionExpression",
          start: 1,
          end: 37,
          loc: {
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 4,
              column: 1
            }
          },
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            start: 13,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 4,
                column: 1
              }
            },
            body: [
              {
                type: "ExpressionStatement",
                start: 16,
                end: 29,
                loc: {
                  start: {
                    line: 2,
                    column: 1
                  },
                  end: {
                    line: 2,
                    column: 14
                  }
                },
                expression: {
                  type: "Literal",
                  start: 16,
                  end: 28,
                  loc: {
                    start: {
                      line: 2,
                      column: 1
                    },
                    end: {
                      line: 2,
                      column: 13
                    }
                  },
                  value: "use strict"
                }
              },
              {
                type: "ExpressionStatement",
                start: 31,
                end: 35,
                loc: {
                  start: {
                    line: 3,
                    column: 1
                  },
                  end: {
                    line: 3,
                    column: 5
                  }
                },
                expression: {
                  type: "Literal",
                  start: 31,
                  end: 34,
                  loc: {
                    start: {
                      line: 3,
                      column: 1
                    },
                    end: {
                      line: 3,
                      column: 4
                    }
                  },
                  value: "\u0000"
                }
              }
            ]
          }
        },
        arguments: [],
        end: 40
      }
    }
  ]
});

test("123..toString(10)", {
  type: "Program",
  start: 0,
  end: 17,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 17,
      expression: {
        type: "CallExpression",
        start: 0,
        callee: {
          type: "MemberExpression",
          start: 0,
          object: {
            type: "Literal",
            start: 0,
            end: 4,
            value: 123
          },
          property: {
            type: "Identifier",
            start: 5,
            end: 13,
            name: "toString"
          },
          computed: false,
          end: 13
        },
        arguments: [
          {
            type: "Literal",
            start: 14,
            end: 16,
            value: 10
          }
        ],
        end: 17
      }
    }
  ]
});

test("123.+2", {
  type: "Program",
  start: 0,
  end: 6,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 6,
      expression: {
        type: "BinaryExpression",
        start: 0,
        left: {
          type: "Literal",
          start: 0,
          end: 4,
          value: 123
        },
        operator: "+",
        right: {
          type: "Literal",
          start: 5,
          end: 6,
          value: 2
        },
        end: 6
      }
    }
  ]
});

test("a\u2028b", {
  type: "Program",
  start: 0,
  end: 3,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 1,
      expression: {
        type: "Identifier",
        start: 0,
        end: 1,
        name: "a"
      }
    },
    {
      type: "ExpressionStatement",
      start: 2,
      end: 3,
      expression: {
        type: "Identifier",
        start: 2,
        end: 3,
        name: "b"
      }
    }
  ]
});

test("'a\\u0026b'", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "a\u0026b"
      }
    }
  ]
});

test("foo: 10; foo: 20;", {
  type: "Program",
  body: [
    {
      type: "LabeledStatement",
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "Literal",
          value: 10,
          raw: "10"
        }
      },
      label: {
        type: "Identifier",
        name: "foo"
      }
    },
    {
      type: "LabeledStatement",
      body: {
        type: "ExpressionStatement",
        expression: {
          type: "Literal",
          value: 20,
          raw: "20"
        }
      },
      label: {
        type: "Identifier",
        name: "foo"
      }
    }
  ]
});

test("if(1)/  foo/", {
  type: "Program",
  start: 0,
  end: 12,
  body: [
    {
      type: "IfStatement",
      start: 0,
      end: 12,
      test: {
        type: "Literal",
        start: 3,
        end: 4,
        value: 1,
        raw: "1"
      },
      consequent: {
        type: "ExpressionStatement",
        start: 5,
        end: 12,
        expression: {
          type: "Literal",
          start: 5,
          end: 12,
          raw: "/  foo/"
        }
      },
      alternate: null
    }
  ]
});

test("price_9̶9̶_89", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "price_9̶9̶_89",
        start: 0,
        end: 13
      }
    }
  ]
});

// option tests

test("var a = 1;", {
  type: "Program",
  start: 0,
  end: 10,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 10
    },
    source: "test.js"
  },
  body: [
    {
      type: "VariableDeclaration",
      start: 0,
      end: 10,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 10
        },
        source: "test.js"
      },
      declarations: [
        {
          type: "VariableDeclarator",
          start: 4,
          end: 9,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            },
            source: "test.js"
          },
          id: {
            type: "Identifier",
            start: 4,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              },
              source: "test.js"
            },
            name: "a"
          },
          init: {
            type: "Literal",
            start: 8,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              },
              source: "test.js"
            },
            value: 1,
            raw: "1"
          }
        }
      ],
      kind: "var"
    }
  ]
}, {
  locations: true,
  sourceFile: "test.js"
});

test("a.in / b", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "a"
          },
          property: {
            type: "Identifier",
            name: "in"
          },
          computed: false
        },
        operator: "/",
        right: {
          type: "Identifier",
          name: "b"
        }
      }
    }
  ]
});

test("{}/=/", {
  type: "Program",
  body: [
    {
      type: "BlockStatement",
      body: []
    },
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        raw: "/=/"
      }
    }
  ]
});

test("foo <!--bar\n+baz", {
  type: "Program",
  start: 0,
  end: 16,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 16,
      expression: {
        type: "BinaryExpression",
        start: 0,
        end: 16,
        left: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        operator: "+",
        right: {
          type: "Identifier",
          start: 13,
          end: 16,
          name: "baz"
        }
      }
    }
  ]
});

test("x = y-->10;\n --> nothing", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "x"
        },
        right: {
          type: "BinaryExpression",
          left: {
            type: "UpdateExpression",
            operator: "--",
            prefix: false,
            argument: {
              type: "Identifier",
              name: "y"
            }
          },
          operator: ">",
          right: {
            type: "Literal",
            value: 10
          }
        }
      }
    }
  ]
});

// Preprocessor tests based on the GCC 4.0 Preprocessor User Guide
// http://gcc.gnu.org/onlinedocs/cpp/index.html

// 1.4 The preprocessing language

// #define may be indented
test("    #define FOO 7\nfoo = FOO;\n", {
  "type": "Program",
  "start": 4,
  "end": 28,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 18,
      "end": 28,
      "expression": {
        "type": "AssignmentExpression",
        "start": 18,
        "end": 17,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 18,
          "end": 21,
          "name": "foo"
        },
        "right": {
          "type": "Literal",
          "start": 16,
          "end": 17,
          "value": 7,
          "raw": "7"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// # may be separated from directive by whitespace
test("# /* comment */ define FOO 13\nfoo = FOO;\n", {
  "type": "Program",
  "start": 0,
  "end": 40,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 30,
      "end": 40,
      "expression": {
        "type": "AssignmentExpression",
        "start": 30,
        "end": 29,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 30,
          "end": 33,
          "name": "foo"
        },
        "right": {
          "type": "Literal",
          "start": 27,
          "end": 29,
          "value": 13,
          "raw": "13"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Preprocessor directives must be the first token on a line
testFail("\"foo\"; #define FOO 13\nfoo = FOO;\n",
         "Preprocessor directives may only be used at the beginning of a line (1:7)",
{
  preprocess: true
});

// Comments may be used anywhere within a macro
test("#define COMMENTS(/* an arg */ arg) /* one */ arg /* two */ * 7 /*\nthree */ + 1\nx = /* before */ COMMENTS(13) /* after */;\n", {
  "type": "Program",
  "start": 0,
  "end": 121,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 79,
      "end": 121,
      "expression": {
        "type": "AssignmentExpression",
        "start": 79,
        "end": 78,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 79,
          "end": 80,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 105,
          "end": 78,
          "commentsBefore": [
            "/* before */"
          ],
          "left": {
            "type": "BinaryExpression",
            "start": 105,
            "end": 62,
            "left": {
              "type": "Literal",
              "start": 105,
              "end": 107,
              "value": 13,
              "raw": "13",
              "commentsAfter": [
                "/* two */"
              ]
            },
            "operator": "*",
            "right": {
              "type": "Literal",
              "start": 61,
              "end": 62,
              "value": 7,
              "raw": "7"
            },
            "commentsAfter": [
              "/*\nthree */"
            ]
          },
          "operator": "+",
          "right": {
            "type": "Literal",
            "start": 77,
            "end": 78,
            "value": 1,
            "raw": "1"
          }
        },
        "commentsAfter": [
          "/* after */"
        ]
      }
    }
  ]
}, {
  preprocess: true,
  trackComments: true
});

// Preprocessor directives do not affect comment/space tracking
test("function test()\n{\n    // Comments are aggregated\n    #define FOO 7\n    // even if there are\n    #undef FOO\n    // preprocessor directives\n    #define FOO 13\n    // in between.\n    var x = FOO;\n    // These comments\n    #define BAR 7\n    // will appear after.\n    #undef BAR\n    // I hope!\n    x = BAR;\n}\n", {
  "type": "Program",
  "start": 0,
  "end": 303,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 303,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "test"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 303,
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 180,
            "end": 192,
            "commentsBefore": [
              "// Comments are aggregated",
              "// even if there are",
              "// preprocessor directives",
              "// in between."
            ],
            "spacesBefore": [
              "\n    ",
              "\n    ",
              "\n    ",
              "\n    "
            ],
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 184,
                "end": 156,
                "id": {
                  "type": "Identifier",
                  "start": 184,
                  "end": 185,
                  "name": "x"
                },
                "init": {
                  "type": "Literal",
                  "start": 154,
                  "end": 156,
                  "value": 13,
                  "raw": "13"
                }
              }
            ],
            "kind": "var",
            "commentsAfter": [
              "// These comments",
              "// will appear after.",
              "// I hope!"
            ],
            "spacesAfter": [
              "\n    ",
              "\n    ",
              "\n    "
            ]
          },
          {
            "type": "ExpressionStatement",
            "start": 293,
            "end": 301,
            "commentsBefore": [
              "// These comments",
              "// will appear after.",
              "// I hope!"
            ],
            "spacesBefore": [
              "\n    ",
              "\n    ",
              "\n    "
            ],
            "expression": {
              "type": "AssignmentExpression",
              "start": 293,
              "end": 300,
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 293,
                "end": 294,
                "name": "x"
              },
              "right": {
                "type": "Identifier",
                "start": 297,
                "end": 300,
                "name": "BAR"
              }
            }
          }
        ]
      }
    }
  ]
}, {
  preprocess: true,
  trackComments: true,
  trackSpaces: true
});

test("function test()\n{\n    var y = 0;\n    // Comments are aggregated\n    #define FOO 7\n    // even if there are\n    #undef FOO\n    // preprocessor directives\n    #define FOO 13\n    // in between.\n    var x = FOO;\n}\n", {
  "type": "Program",
  "start": 0,
  "end": 209,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 209,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "test"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 209,
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 22,
            "end": 32,
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 26,
                "end": 31,
                "id": {
                  "type": "Identifier",
                  "start": 26,
                  "end": 27,
                  "name": "y"
                },
                "init": {
                  "type": "Literal",
                  "start": 30,
                  "end": 31,
                  "value": 0,
                  "raw": "0"
                }
              }
            ],
            "kind": "var",
            "commentsAfter": [
              "// Comments are aggregated",
              "// even if there are",
              "// preprocessor directives",
              "// in between."
            ]
          },
          {
            "type": "VariableDeclaration",
            "start": 195,
            "end": 207,
            "commentsBefore": [
              "// Comments are aggregated",
              "// even if there are",
              "// preprocessor directives",
              "// in between."
            ],
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 199,
                "end": 171,
                "id": {
                  "type": "Identifier",
                  "start": 199,
                  "end": 200,
                  "name": "x"
                },
                "init": {
                  "type": "Literal",
                  "start": 169,
                  "end": 171,
                  "value": 13,
                  "raw": "13"
                }
              }
            ],
            "kind": "var"
          }
        ]
      }
    }
  ]
}
, {
  preprocess: true,
  trackComments: true
});

// 3.1 Object-like macros

// Macros may span multiple lines
test("#define NUMBERS 1, \\\n                2, \\\n                3\nx = [NUMBERS];\n", {
  "type": "Program",
  "start": 0,
  "end": 74,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 60,
      "end": 74,
      "expression": {
        "type": "AssignmentExpression",
        "start": 60,
        "end": 73,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 60,
          "end": 61,
          "name": "x"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 64,
          "end": 73,
          "elements": [
            {
              "type": "Literal",
              "start": 16,
              "end": 17,
              "value": 1,
              "raw": "1"
            },
            {
              "type": "Literal",
              "start": 37,
              "end": 38,
              "value": 2,
              "raw": "2"
            },
            {
              "type": "Literal",
              "start": 58,
              "end": 59,
              "value": 3,
              "raw": "3"
            }
          ]
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Macros only take effect from point of definition
test("foo = X;\n#define X 4\nbar = X;\n", {
  "type": "Program",
  "start": 0,
  "end": 29,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 8,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 7,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 3,
          "name": "foo"
        },
        "right": {
          "type": "Identifier",
          "start": 6,
          "end": 7,
          "name": "X"
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 21,
      "end": 29,
      "expression": {
        "type": "AssignmentExpression",
        "start": 21,
        "end": 20,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 21,
          "end": 24,
          "name": "bar"
        },
        "right": {
          "type": "Literal",
          "start": 19,
          "end": 20,
          "value": 4,
          "raw": "4"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Macros are evaluated when expanded
test("#define TABLESIZE BUFSIZE\n#define BUFSIZE 1024\nfoo = TABLESIZE;\n", {
  "type": "Program",
  "start": 0,
  "end": 63,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 47,
      "end": 63,
      "expression": {
        "type": "AssignmentExpression",
        "start": 47,
        "end": 46,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 47,
          "end": 50,
          "name": "foo"
        },
        "right": {
          "type": "Literal",
          "start": 42,
          "end": 46,
          "value": 1024,
          "raw": "1024"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Macros can be redefined
test("#define BUFSIZE 1020\n#define TABLESIZE BUFSIZE\nfoo = TABLESIZE;\n#undef BUFSIZE\n#define BUFSIZE 37\nfoo = TABLESIZE;\n", {
  "type": "Program",
  "start": 0,
  "end": 114,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 47,
      "end": 63,
      "expression": {
        "type": "AssignmentExpression",
        "start": 47,
        "end": 20,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 47,
          "end": 50,
          "name": "foo"
        },
        "right": {
          "type": "Literal",
          "start": 16,
          "end": 20,
          "value": 1020,
          "raw": "1020"
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 98,
      "end": 114,
      "expression": {
        "type": "AssignmentExpression",
        "start": 98,
        "end": 97,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 98,
          "end": 101,
          "name": "foo"
        },
        "right": {
          "type": "Literal",
          "start": 95,
          "end": 97,
          "value": 37,
          "raw": "37"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// 3.2 Function-like Macros

// Macros can be called like functions
test("#define lang_init()  c_init()\nlang_init();\n", {
  "type": "Program",
  "start": 0,
  "end": 42,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 21,
      "end": 42,
      "expression": {
        "type": "CallExpression",
        "start": 21,
        "end": 29,
        "callee": {
          "type": "Identifier",
          "start": 21,
          "end": 27,
          "name": "c_init"
        },
        "arguments": []
      }
    }
  ]
}, {
  preprocess: true
});

// Function macros used without args are not expanded
test("function foobar() { console.log(\"out of line\"); }\n#define foobar()  console.log(\"inline\");\nfoobar();\nfuncptr = foobar;\n", {
  "type": "Program",
  "start": 0,
  "end": 118,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 49,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 15,
        "name": "foobar"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 18,
        "end": 49,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 20,
            "end": 47,
            "expression": {
              "type": "CallExpression",
              "start": 20,
              "end": 46,
              "callee": {
                "type": "MemberExpression",
                "start": 20,
                "end": 31,
                "object": {
                  "type": "Identifier",
                  "start": 20,
                  "end": 27,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 28,
                  "end": 31,
                  "name": "log"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 32,
                  "end": 45,
                  "value": "out of line",
                  "raw": "\"out of line\""
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 68,
      "end": 90,
      "expression": {
        "type": "CallExpression",
        "start": 68,
        "end": 89,
        "callee": {
          "type": "MemberExpression",
          "start": 68,
          "end": 79,
          "object": {
            "type": "Identifier",
            "start": 68,
            "end": 75,
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "start": 76,
            "end": 79,
            "name": "log"
          },
          "computed": false
        },
        "arguments": [
          {
            "type": "Literal",
            "start": 80,
            "end": 88,
            "value": "inline",
            "raw": "\"inline\""
          }
        ]
      }
    },
    {
      "type": "EmptyStatement",
      "start": 99,
      "end": 100
    },
    {
      "type": "ExpressionStatement",
      "start": 101,
      "end": 118,
      "expression": {
        "type": "AssignmentExpression",
        "start": 101,
        "end": 117,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 101,
          "end": 108,
          "name": "funcptr"
        },
        "right": {
          "type": "Identifier",
          "start": 111,
          "end": 117,
          "name": "foobar"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Macro parameters must immediately follow the name
test("#define lang_init (arg);    c_init()\nlang_init();\n", {
  "type": "Program",
  "start": 0,
  "end": 49,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 18,
      "end": 24,
      "expression": {
        "type": "Identifier",
        "start": 18,
        "end": 23,
        "name": "arg"
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 28,
      "end": 49,
      "expression": {
        "type": "CallExpression",
        "start": 28,
        "end": 48,
        "callee": {
          "type": "CallExpression",
          "start": 28,
          "end": 36,
          "callee": {
            "type": "Identifier",
            "start": 28,
            "end": 34,
            "name": "c_init"
          },
          "arguments": []
        },
        "arguments": []
      }
    }
  ]
}, {
  preprocess: true
});

// 3.3 Macro Arguments

// Macros can take arguments
test("#define min(X, Y)  ((X) < (Y) ? (X) : (Y))\nx = min(a, b);\ny = min(1, 2);\nz = min(a + 28, p);\n", {
  "type": "Program",
  "start": 0,
  "end": 92,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 43,
      "end": 57,
      "expression": {
        "type": "AssignmentExpression",
        "start": 43,
        "end": 42,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 43,
          "end": 44,
          "name": "x"
        },
        "right": {
          "type": "ConditionalExpression",
          "start": 19,
          "end": 42,
          "test": {
            "type": "BinaryExpression",
            "start": 20,
            "end": 29,
            "left": {
              "type": "Identifier",
              "start": 20,
              "end": 23,
              "name": "a"
            },
            "operator": "<",
            "right": {
              "type": "Identifier",
              "start": 26,
              "end": 29,
              "name": "b"
            }
          },
          "consequent": {
            "type": "Identifier",
            "start": 32,
            "end": 35,
            "name": "a"
          },
          "alternate": {
            "type": "Identifier",
            "start": 38,
            "end": 41,
            "name": "b"
          }
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 58,
      "end": 72,
      "expression": {
        "type": "AssignmentExpression",
        "start": 58,
        "end": 42,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 58,
          "end": 59,
          "name": "y"
        },
        "right": {
          "type": "ConditionalExpression",
          "start": 19,
          "end": 42,
          "test": {
            "type": "BinaryExpression",
            "start": 20,
            "end": 29,
            "left": {
              "type": "Literal",
              "start": 20,
              "end": 23,
              "value": 1,
              "raw": "1"
            },
            "operator": "<",
            "right": {
              "type": "Literal",
              "start": 26,
              "end": 29,
              "value": 2,
              "raw": "2"
            }
          },
          "consequent": {
            "type": "Literal",
            "start": 32,
            "end": 35,
            "value": 1,
            "raw": "1"
          },
          "alternate": {
            "type": "Literal",
            "start": 38,
            "end": 41,
            "value": 2,
            "raw": "2"
          }
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 73,
      "end": 92,
      "expression": {
        "type": "AssignmentExpression",
        "start": 73,
        "end": 42,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 73,
          "end": 74,
          "name": "z"
        },
        "right": {
          "type": "ConditionalExpression",
          "start": 19,
          "end": 42,
          "test": {
            "type": "BinaryExpression",
            "start": 20,
            "end": 29,
            "left": {
              "type": "BinaryExpression",
              "start": 20,
              "end": 23,
              "left": {
                "type": "Identifier",
                "start": 81,
                "end": 82,
                "name": "a"
              },
              "operator": "+",
              "right": {
                "type": "Literal",
                "start": 85,
                "end": 87,
                "value": 28,
                "raw": "28"
              }
            },
            "operator": "<",
            "right": {
              "type": "Identifier",
              "start": 26,
              "end": 29,
              "name": "p"
            }
          },
          "consequent": {
            "type": "BinaryExpression",
            "start": 32,
            "end": 35,
            "left": {
              "type": "Identifier",
              "start": 81,
              "end": 82,
              "name": "a"
            },
            "operator": "+",
            "right": {
              "type": "Literal",
              "start": 85,
              "end": 87,
              "value": 28,
              "raw": "28"
            }
          },
          "alternate": {
            "type": "Identifier",
            "start": 38,
            "end": 41,
            "name": "p"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Leading and trailing whitespace is trimmed, whitespace between tokens is reduced to single space
test("#define min(X, Y)  ((X) < (Y) ? (X) : (Y))\nx = min(  a   +   7,\n         b\n         -\n         13  );\n", {
  "type": "Program",
  "start": 0,
  "end": 101,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 43,
      "end": 101,
      "expression": {
        "type": "AssignmentExpression",
        "start": 43,
        "end": 42,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 43,
          "end": 44,
          "name": "x"
        },
        "right": {
          "type": "ConditionalExpression",
          "start": 19,
          "end": 42,
          "test": {
            "type": "BinaryExpression",
            "start": 20,
            "end": 29,
            "left": {
              "type": "BinaryExpression",
              "start": 20,
              "end": 23,
              "left": {
                "type": "Identifier",
                "start": 53,
                "end": 54,
                "name": "a"
              },
              "operator": "+",
              "right": {
                "type": "Literal",
                "start": 61,
                "end": 62,
                "value": 7,
                "raw": "7"
              }
            },
            "operator": "<",
            "right": {
              "type": "BinaryExpression",
              "start": 26,
              "end": 29,
              "left": {
                "type": "Identifier",
                "start": 73,
                "end": 74,
                "name": "b"
              },
              "operator": "-",
              "right": {
                "type": "Literal",
                "start": 95,
                "end": 97,
                "value": 13,
                "raw": "13"
              }
            }
          },
          "consequent": {
            "type": "BinaryExpression",
            "start": 32,
            "end": 35,
            "left": {
              "type": "Identifier",
              "start": 53,
              "end": 54,
              "name": "a"
            },
            "operator": "+",
            "right": {
              "type": "Literal",
              "start": 61,
              "end": 62,
              "value": 7,
              "raw": "7"
            }
          },
          "alternate": {
            "type": "BinaryExpression",
            "start": 38,
            "end": 41,
            "left": {
              "type": "Identifier",
              "start": 73,
              "end": 74,
              "name": "b"
            },
            "operator": "-",
            "right": {
              "type": "Literal",
              "start": 95,
              "end": 97,
              "value": 13,
              "raw": "13"
            }
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Square brackets do not have to balance
test("#define square_brackets(arg1, arg2)  arg1 ## arg2\na = square_brackets([x, y]);\n", {
  "type": "Program",
  "start": 0,
  "end": 78,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 50,
      "end": 78,
      "expression": {
        "type": "AssignmentExpression",
        "start": 50,
        "end": 76,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 50,
          "end": 51,
          "name": "a"
        },
        "right": {
          "type": "ArrayExpression",
          "start": 70,
          "end": 76,
          "elements": [
            {
              "type": "Identifier",
              "start": 0,
              "end": 2,
              "name": "xy"
            }
          ]
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Commas may be within arguments
test("#define comma(arg)  arg;\ncomma((x = 0, y = 1));\n", {
  "type": "Program",
  "start": 0,
  "end": 47,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 31,
      "end": 24,
      "expression": {
        "type": "SequenceExpression",
        "start": 31,
        "end": 45,
        "expressions": [
          {
            "type": "AssignmentExpression",
            "start": 32,
            "end": 37,
            "operator": "=",
            "left": {
              "type": "Identifier",
              "start": 32,
              "end": 33,
              "name": "x"
            },
            "right": {
              "type": "Literal",
              "start": 36,
              "end": 37,
              "value": 0,
              "raw": "0"
            }
          },
          {
            "type": "AssignmentExpression",
            "start": 39,
            "end": 44,
            "operator": "=",
            "left": {
              "type": "Identifier",
              "start": 39,
              "end": 40,
              "name": "y"
            },
            "right": {
              "type": "Literal",
              "start": 43,
              "end": 44,
              "value": 1,
              "raw": "1"
            }
          }
        ]
      }
    },
    {
      "type": "EmptyStatement",
      "start": 46,
      "end": 47
    }
  ]
}, {
  preprocess: true
});

// Arguments are macro-expanded before substitution
test("#define DOUBLE(arg)  (arg) * 2\nx = min(DOUBLE(a), 10);\n", {
  "type": "Program",
  "start": 0,
  "end": 54,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 31,
      "end": 54,
      "expression": {
        "type": "AssignmentExpression",
        "start": 31,
        "end": 53,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 31,
          "end": 32,
          "name": "x"
        },
        "right": {
          "type": "CallExpression",
          "start": 35,
          "end": 53,
          "callee": {
            "type": "Identifier",
            "start": 35,
            "end": 38,
            "name": "min"
          },
          "arguments": [
            {
              "type": "BinaryExpression",
              "start": 21,
              "end": 30,
              "left": {
                "type": "Identifier",
                "start": 21,
                "end": 26,
                "name": "a"
              },
              "operator": "*",
              "right": {
                "type": "Literal",
                "start": 29,
                "end": 30,
                "value": 2,
                "raw": "2"
              }
            },
            {
              "type": "Literal",
              "start": 50,
              "end": 52,
              "value": 10,
              "raw": "10"
            }
          ]
        }
      }
    }
  ]
}, {
  preprocess: true
});

// After substitution, the complete text is scanned again for macros
// to expand, including the arguments.

// #define DOUBLE(arg)  (arg) * 2
// #define QUADRUPLE(arg)  DOUBLE(arg) * 2
// x = QUADRUPLE(7);
// ==> x = DOUBLE(7) * 2;
// x = 7 * 2 * 2;

// #define paste_arg(arg1, arg2)  arg1 ## arg2
// x = paste_arg(QUAD, RUPLE(7));
// ==> x = QUAD ## RUPLE(7);
// ==> x = QUADRUPLE(7);
// ==> x = DOUBLE(7) * 2;
// x = 7 * 2 * 2;
test("#define DOUBLE(arg)  (arg) * 2\n#define QUADRUPLE(arg)  DOUBLE(arg) * 2\nx = QUADRUPLE(7);\n#define paste_arg(arg1, arg2)  arg1 ## arg2\nx = paste_arg(QUAD, RUPLE(7));\n", {
  "type": "Program",
  "start": 0,
  "end": 163,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 71,
      "end": 88,
      "expression": {
        "type": "AssignmentExpression",
        "start": 71,
        "end": 70,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 71,
          "end": 72,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 21,
          "end": 70,
          "left": {
            "type": "BinaryExpression",
            "start": 21,
            "end": 30,
            "left": {
              "type": "Literal",
              "start": 21,
              "end": 26,
              "value": 7,
              "raw": "7"
            },
            "operator": "*",
            "right": {
              "type": "Literal",
              "start": 29,
              "end": 30,
              "value": 2,
              "raw": "2"
            }
          },
          "operator": "*",
          "right": {
            "type": "Literal",
            "start": 69,
            "end": 70,
            "value": 2,
            "raw": "2"
          }
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 133,
      "end": 163,
      "expression": {
        "type": "AssignmentExpression",
        "start": 133,
        "end": 70,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 133,
          "end": 134,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 21,
          "end": 70,
          "left": {
            "type": "BinaryExpression",
            "start": 21,
            "end": 30,
            "left": {
              "type": "Literal",
              "start": 21,
              "end": 26,
              "value": 7,
              "raw": "7"
            },
            "operator": "*",
            "right": {
              "type": "Literal",
              "start": 29,
              "end": 30,
              "value": 2,
              "raw": "2"
            }
          },
          "operator": "*",
          "right": {
            "type": "Literal",
            "start": 69,
            "end": 70,
            "value": 2,
            "raw": "2"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Arguments may be empty
test("#define ARGS(arg, arg2)  arg arg2\nARGS(,);\nARGS(, 2);\nARGS(1,);\n", {
  "type": "Program",
  "start": 0,
  "end": 63,
  "body": [
    {
      "type": "EmptyStatement",
      "start": 41,
      "end": 53
    },
    {
      "type": "ExpressionStatement",
      "start": 50,
      "end": 63,
      "expression": {
        "type": "Literal",
        "start": 50,
        "end": 51,
        "value": 2,
        "raw": "2"
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 59,
      "end": 63,
      "expression": {
        "type": "Literal",
        "start": 59,
        "end": 60,
        "value": 1,
        "raw": "1"
      }
    }
  ]
}, {
  preprocess: true
});

// Macro parameters appearing inside string literals are not replaced by their corresponding actual arguments
test("#define literal(arg)  arg; \"arg\"\nliteral(test);\n", {
  "type": "Program",
  "start": 0,
  "end": 47,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 41,
      "end": 26,
      "expression": {
        "type": "Identifier",
        "start": 41,
        "end": 45,
        "name": "test"
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 27,
      "end": 47,
      "expression": {
        "type": "Literal",
        "start": 27,
        "end": 32,
        "value": "arg",
        "raw": "\"arg\""
      }
    }
  ]
}, {
  preprocess: true
});

// 3.4 Stringification

// The preprocessor backslash-escapes the quotes surrounding embedded string constants,
// and all backslashes within string and character constants
test("#define stringify(arg)  #arg\nx = stringify(p = \"foo\\n\");\nx = stringify(p = 'foo\\n');\n", {
  "type": "Program",
  "start": 0,
  "end": 84,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 29,
      "end": 56,
      "expression": {
        "type": "AssignmentExpression",
        "start": 29,
        "end": 16,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 29,
          "end": 30,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 16,
          "value": "p = \\\"foo\\\\n\\\"",
          "raw": "\"p = \\\"foo\\\\n\\\"\""
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 57,
      "end": 84,
      "expression": {
        "type": "AssignmentExpression",
        "start": 57,
        "end": 14,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 57,
          "end": 58,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 14,
          "value": "p = 'foo\\\\n'",
          "raw": "\"p = 'foo\\\\n'\""
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Backslashes that are not inside string or character constants are not duplicated
// "foo bar" has a tab between the words, which is stringified to "\t".
test("#define stringify(arg)  #arg\nx = stringify(\"foo	bar\");\n", {
  "type": "Program",
  "start": 0,
  "end": 54,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 29,
      "end": 54,
      "expression": {
        "type": "AssignmentExpression",
        "start": 29,
        "end": 14,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 29,
          "end": 30,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 14,
          "value": "\\\"foo\\tbar\\\"",
          "raw": "\"\\\"foo\\tbar\\\"\""
        }
      }
    }
  ]
}, {
  preprocess: true
});

// All leading and trailing whitespace in text being stringified is ignored.
// Any sequence of whitespace in the middle of the text is converted to a single space
// in the stringified result.
test("#define stringify(arg)  #arg\nx = stringify(   foo  =\n                '  b a r  '   );\n", {
  "type": "Program",
  "start": 0,
  "end": 85,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 29,
      "end": 85,
      "expression": {
        "type": "AssignmentExpression",
        "start": 29,
        "end": 19,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 29,
          "end": 30,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 19,
          "value": "foo = '  b a r  '",
          "raw": "\"foo = '  b a r  '\""
        }
      }
    }
  ]
}, {
  preprocess: true
});

// If you want to stringify the result of expansion of a macro argument,
// you have to use two levels of macros.
test("#define xstr(s) str(s)\n#define str(s) #s\n#define foo 4\nx = str (foo);\nx = xstr (foo);\n", {
  "type": "Program",
  "start": 0,
  "end": 85,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 55,
      "end": 69,
      "expression": {
        "type": "AssignmentExpression",
        "start": 55,
        "end": 5,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 55,
          "end": 56,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 5,
          "value": "foo",
          "raw": "\"foo\""
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 70,
      "end": 85,
      "expression": {
        "type": "AssignmentExpression",
        "start": 70,
        "end": 3,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 70,
          "end": 71,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 3,
          "value": "4",
          "raw": "\"4\""
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Empty arg becomes empty string
test("#define stringify2(arg1, arg2)  #arg2\nx = stringify2(foo,);\n", {
  "type": "Program",
  "start": 0,
  "end": 59,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 38,
      "end": 59,
      "expression": {
        "type": "AssignmentExpression",
        "start": 38,
        "end": 2,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 38,
          "end": 39,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 0,
          "end": 2,
          "value": "",
          "raw": "\"\""
        }
      }
    }
  ]
}, {
  preprocess: true
});

// 3.5 Concatenation

// As with stringification, the actual argument is not macro-expanded first.
test("#define foo 4\n#define concatenate(arg1, arg2)  arg1 + arg1 ## arg2 ## 7\nx = concatenate(foo, bar);\n", {
  "type": "Program",
  "start": 0,
  "end": 98,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 72,
      "end": 98,
      "expression": {
        "type": "AssignmentExpression",
        "start": 72,
        "end": 7,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 72,
          "end": 73,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 12,
          "end": 7,
          "left": {
            "type": "Literal",
            "start": 12,
            "end": 13,
            "value": 4,
            "raw": "4"
          },
          "operator": "+",
          "right": {
            "type": "Identifier",
            "start": 0,
            "end": 7,
            "name": "foobar7"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// If the argument is empty, that `##' has no effect.
test("#define foo 4\n#define concatenate(arg1, arg2)  arg1 + arg1 ## arg2 ## 7\nx = concatenate(foo, );\n", {
  "type": "Program",
  "start": 0,
  "end": 95,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 72,
      "end": 95,
      "expression": {
        "type": "AssignmentExpression",
        "start": 72,
        "end": 4,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 72,
          "end": 73,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 12,
          "end": 4,
          "left": {
            "type": "Literal",
            "start": 12,
            "end": 13,
            "value": 4,
            "raw": "4"
          },
          "operator": "+",
          "right": {
            "type": "Identifier",
            "start": 0,
            "end": 4,
            "name": "foo7"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Only the leading and trailing tokens in argument are pasted
test("#define foo 4\n#define concatenate(arg1, arg2)  arg1 + arg1 ## arg2 ## 7\nx = concatenate(foo + 1, 7 + foo);\n", {
  "type": "Program",
  "start": 0,
  "end": 106,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 72,
      "end": 106,
      "expression": {
        "type": "AssignmentExpression",
        "start": 72,
        "end": 4,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 72,
          "end": 73,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 12,
          "end": 4,
          "left": {
            "type": "BinaryExpression",
            "start": 12,
            "end": 2,
            "left": {
              "type": "BinaryExpression",
              "start": 12,
              "end": 13,
              "left": {
                "type": "BinaryExpression",
                "start": 12,
                "end": 95,
                "left": {
                  "type": "Literal",
                  "start": 12,
                  "end": 13,
                  "value": 4,
                  "raw": "4"
                },
                "operator": "+",
                "right": {
                  "type": "Literal",
                  "start": 94,
                  "end": 95,
                  "value": 1,
                  "raw": "1"
                }
              },
              "operator": "+",
              "right": {
                "type": "Literal",
                "start": 12,
                "end": 13,
                "value": 4,
                "raw": "4"
              }
            },
            "operator": "+",
            "right": {
              "type": "Literal",
              "start": 0,
              "end": 2,
              "value": 17,
              "raw": "17"
            }
          },
          "operator": "+",
          "right": {
            "type": "Identifier",
            "start": 0,
            "end": 4,
            "name": "foo7"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

test("#define COMMAND(NAME)  { name: #NAME, command: NAME ## _command }\nx = COMMAND(foo);\n", {
  "type": "Program",
  "start": 0,
  "end": 83,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 66,
      "end": 83,
      "expression": {
        "type": "AssignmentExpression",
        "start": 66,
        "end": 65,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 66,
          "end": 67,
          "name": "x"
        },
        "right": {
          "type": "ObjectExpression",
          "start": 23,
          "end": 65,
          "properties": [
            {
              "key": {
                "type": "Identifier",
                "start": 25,
                "end": 29,
                "name": "name"
              },
              "value": {
                "type": "Literal",
                "start": 0,
                "end": 5,
                "value": "foo",
                "raw": "\"foo\""
              },
              "kind": "init"
            },
            {
              "key": {
                "type": "Identifier",
                "start": 38,
                "end": 45,
                "name": "command"
              },
              "value": {
                "type": "Identifier",
                "start": 0,
                "end": 11,
                "name": "foo_command"
              },
              "kind": "init"
            }
          ]
        }
      }
    }
  ]
}, {
  preprocess: true
});

// If the pasted token is invalid, a warning is issued and the two tokens are left as is
test("#define paste_fail(arg1, arg2)  arg1 ## arg2\nx = paste_fail(\"paste\", + \"me\");\n", {
  "type": "Program",
  "start": 0,
  "end": 77,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 45,
      "end": 77,
      "expression": {
        "type": "AssignmentExpression",
        "start": 45,
        "end": 75,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 45,
          "end": 46,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 60,
          "end": 75,
          "left": {
            "type": "Literal",
            "start": 60,
            "end": 67,
            "value": "paste",
            "raw": "\"paste\""
          },
          "operator": "+",
          "right": {
            "type": "Literal",
            "start": 71,
            "end": 75,
            "value": "me",
            "raw": "\"me\""
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// 3.6 Variadic Macros

// Variadic macros may also have named parameters
test("#define variadic(arg, ...)  arg __VA_ARGS__\nx = variadic(7);\n", {
  "type": "Program",
  "start": 0,
  "end": 60,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 44,
      "end": 60,
      "expression": {
        "type": "AssignmentExpression",
        "start": 44,
        "end": 58,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 44,
          "end": 45,
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "start": 57,
          "end": 58,
          "value": 7,
          "raw": "7"
        }
      }
    }
  ]
}, {
  preprocess: true
});

// The named parameter may be empty in the arguments, args are macro-expanded
test("#define ignore_arg(arg, ...)  arg someFunction(__VA_ARGS__)\n#define increment(arg)  arg + 1\nignore_arg(, \"foo\", increment(7), 13);\n", {
  "type": "Program",
  "start": 0,
  "end": 130,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 34,
      "end": 130,
      "expression": {
        "type": "CallExpression",
        "start": 34,
        "end": 59,
        "callee": {
          "type": "Identifier",
          "start": 34,
          "end": 46,
          "name": "someFunction"
        },
        "arguments": [
          {
            "type": "Literal",
            "start": 105,
            "end": 110,
            "value": "foo",
            "raw": "\"foo\""
          },
          {
            "type": "BinaryExpression",
            "start": 122,
            "end": 91,
            "left": {
              "type": "Literal",
              "start": 122,
              "end": 123,
              "value": 7,
              "raw": "7"
            },
            "operator": "+",
            "right": {
              "type": "Literal",
              "start": 90,
              "end": 91,
              "value": 1,
              "raw": "1"
            }
          },
          {
            "type": "Literal",
            "start": 126,
            "end": 128,
            "value": 13,
            "raw": "13"
          }
        ]
      }
    }
  ]
}, {
  preprocess: true
});

// Both named and variadic parameters may be used together
test("#define debuglog(format, ...)  if (debugging) console.log(format, __VA_ARGS__)\ndebuglog(\"%s: (%d, %d)\", \"foo\", 13.27, 31.7);\n", {
  "type": "Program",
  "start": 0,
  "end": 124,
  "body": [
    {
      "type": "IfStatement",
      "start": 31,
      "end": 124,
      "test": {
        "type": "Identifier",
        "start": 35,
        "end": 44,
        "name": "debugging"
      },
      "consequent": {
        "type": "ExpressionStatement",
        "start": 46,
        "end": 124,
        "expression": {
          "type": "CallExpression",
          "start": 46,
          "end": 78,
          "callee": {
            "type": "MemberExpression",
            "start": 46,
            "end": 57,
            "object": {
              "type": "Identifier",
              "start": 46,
              "end": 53,
              "name": "console"
            },
            "property": {
              "type": "Identifier",
              "start": 54,
              "end": 57,
              "name": "log"
            },
            "computed": false
          },
          "arguments": [
            {
              "type": "Literal",
              "start": 88,
              "end": 102,
              "value": "%s: (%d, %d)",
              "raw": "\"%s: (%d, %d)\""
            },
            {
              "type": "Literal",
              "start": 104,
              "end": 109,
              "value": "foo",
              "raw": "\"foo\""
            },
            {
              "type": "Literal",
              "start": 111,
              "end": 116,
              "value": 13.27,
              "raw": "13.27"
            },
            {
              "type": "Literal",
              "start": 118,
              "end": 122,
              "value": 31.7,
              "raw": "31.7"
            }
          ]
        }
      },
      "alternate": null
    }
  ]
}, {
  preprocess: true
});

test("#define variadic2(...)  __VA_ARGS__\nvariadic2();\nvariadic2(var x = 1, y = 2, z = 3);\n", {
  "type": "Program",
  "start": 0,
  "end": 84,
  "body": [
    {
      "type": "EmptyStatement",
      "start": 47,
      "end": 84
    },
    {
      "type": "VariableDeclaration",
      "start": 59,
      "end": 84,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 63,
          "end": 68,
          "id": {
            "type": "Identifier",
            "start": 63,
            "end": 64,
            "name": "x"
          },
          "init": {
            "type": "Literal",
            "start": 67,
            "end": 68,
            "value": 1,
            "raw": "1"
          }
        },
        {
          "type": "VariableDeclarator",
          "start": 70,
          "end": 75,
          "id": {
            "type": "Identifier",
            "start": 70,
            "end": 71,
            "name": "y"
          },
          "init": {
            "type": "Literal",
            "start": 74,
            "end": 75,
            "value": 2,
            "raw": "2"
          }
        },
        {
          "type": "VariableDeclarator",
          "start": 77,
          "end": 82,
          "id": {
            "type": "Identifier",
            "start": 77,
            "end": 78,
            "name": "z"
          },
          "init": {
            "type": "Literal",
            "start": 81,
            "end": 82,
            "value": 3,
            "raw": "3"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {
  preprocess: true
});

// 3.7.1 Standard Predefined Macros

// Only __OBJJ__ is defined
test("objj = __OBJJ__;\n", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 10,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 4,
          "name": "objj"
        },
        "right": {
          "type": "Literal",
          "start": 9,
          "end": 10,
          "value": 1,
          "raw": "1"
        }
      }
    }
  ]
}, {
  preprocess: true,
  objj: true
});

test("objj = __OBJJ__;\n", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 15,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 4,
          "name": "objj"
        },
        "right": {
          "type": "Identifier",
          "start": 7,
          "end": 15,
          "name": "__OBJJ__"
        }
      }
    }
  ]
}, {
  preprocess: true,
  objj: false
});

// 3.10.1 Misnesting

test("#define twice(x) (2*(x))\n#define call_with_1(x) x(1)\ncall_with_1 (twice);\n", {
  "type": "Program",
  "start": 0,
  "end": 73,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 17,
      "end": 73,
      "expression": {
        "type": "BinaryExpression",
        "start": 17,
        "end": 24,
        "left": {
          "type": "Literal",
          "start": 18,
          "end": 19,
          "value": 2,
          "raw": "2"
        },
        "operator": "*",
        "right": {
          "type": "Literal",
          "start": 20,
          "end": 23,
          "value": 1,
          "raw": "1"
        }
      }
    }
  ]
}, {
  preprocess: true
});

test("#define strange(file) fprintf (file, \"%s %d\",\nstrange(stderr) p, 35);\n", {
  "type": "Program",
  "start": 0,
  "end": 69,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 22,
      "end": 69,
      "expression": {
        "type": "CallExpression",
        "start": 22,
        "end": 68,
        "callee": {
          "type": "Identifier",
          "start": 22,
          "end": 29,
          "name": "fprintf"
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 54,
            "end": 60,
            "name": "stderr"
          },
          {
            "type": "Literal",
            "start": 37,
            "end": 44,
            "value": "%s %d",
            "raw": "\"%s %d\""
          },
          {
            "type": "Identifier",
            "start": 62,
            "end": 63,
            "name": "p"
          },
          {
            "type": "Literal",
            "start": 65,
            "end": 67,
            "value": 35,
            "raw": "35"
          }
        ]
      }
    }
  ]
}, {
  preprocess: true
});

// 3.10.5 Self-Referential Macros

test("#define self_reference (4 + self_reference)\nx = self_reference;\n", {
  "type": "Program",
  "start": 0,
  "end": 63,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 44,
      "end": 63,
      "expression": {
        "type": "AssignmentExpression",
        "start": 44,
        "end": 43,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 44,
          "end": 45,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 23,
          "end": 43,
          "left": {
            "type": "Literal",
            "start": 24,
            "end": 25,
            "value": 4,
            "raw": "4"
          },
          "operator": "+",
          "right": {
            "type": "Identifier",
            "start": 28,
            "end": 42,
            "name": "self_reference"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

test("#define EPERM EPERM\nx = EPERM;\n", {
  "type": "Program",
  "start": 0,
  "end": 30,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 20,
      "end": 30,
      "expression": {
        "type": "AssignmentExpression",
        "start": 20,
        "end": 19,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 20,
          "end": 21,
          "name": "x"
        },
        "right": {
          "type": "Identifier",
          "start": 14,
          "end": 19,
          "name": "EPERM"
        }
      }
    }
  ]
}, {
  preprocess: true
});

test("#define ref1 (4 + ref2)\n#define ref2 (2 * ref1)\nx = ref1;\ny = ref2;\n", {
  "type": "Program",
  "start": 0,
  "end": 67,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 48,
      "end": 57,
      "expression": {
        "type": "AssignmentExpression",
        "start": 48,
        "end": 23,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 48,
          "end": 49,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 13,
          "end": 23,
          "left": {
            "type": "Literal",
            "start": 14,
            "end": 15,
            "value": 4,
            "raw": "4"
          },
          "operator": "+",
          "right": {
            "type": "BinaryExpression",
            "start": 37,
            "end": 47,
            "left": {
              "type": "Literal",
              "start": 38,
              "end": 39,
              "value": 2,
              "raw": "2"
            },
            "operator": "*",
            "right": {
              "type": "Identifier",
              "start": 42,
              "end": 46,
              "name": "ref1"
            }
          }
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 58,
      "end": 67,
      "expression": {
        "type": "AssignmentExpression",
        "start": 58,
        "end": 47,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 58,
          "end": 59,
          "name": "y"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 37,
          "end": 47,
          "left": {
            "type": "Literal",
            "start": 38,
            "end": 39,
            "value": 2,
            "raw": "2"
          },
          "operator": "*",
          "right": {
            "type": "BinaryExpression",
            "start": 13,
            "end": 23,
            "left": {
              "type": "Literal",
              "start": 14,
              "end": 15,
              "value": 4,
              "raw": "4"
            },
            "operator": "+",
            "right": {
              "type": "Identifier",
              "start": 18,
              "end": 22,
              "name": "ref2"
            }
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

// 3.10.6 Argument Prescan

test("#define f(arg) arg * 2\nx = f (f (f(1)));\n", {
  "type": "Program",
  "start": 0,
  "end": 40,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 23,
      "end": 40,
      "expression": {
        "type": "AssignmentExpression",
        "start": 23,
        "end": 22,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 23,
          "end": 24,
          "name": "x"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 35,
          "end": 22,
          "left": {
            "type": "BinaryExpression",
            "start": 35,
            "end": 22,
            "left": {
              "type": "BinaryExpression",
              "start": 35,
              "end": 22,
              "left": {
                "type": "Literal",
                "start": 35,
                "end": 36,
                "value": 1,
                "raw": "1"
              },
              "operator": "*",
              "right": {
                "type": "Literal",
                "start": 21,
                "end": 22,
                "value": 2,
                "raw": "2"
              }
            },
            "operator": "*",
            "right": {
              "type": "Literal",
              "start": 21,
              "end": 22,
              "value": 2,
              "raw": "2"
            }
          },
          "operator": "*",
          "right": {
            "type": "Literal",
            "start": 21,
            "end": 22,
            "value": 2,
            "raw": "2"
          }
        }
      }
    }
  ]
}, {
  preprocess: true
});

test("#define AFTERX(x) X_ ## x\n#define XAFTERX(x) AFTERX(x)\n#define TABLESIZE 1024\n#define BUFSIZE TABLESIZE\nvar a = AFTERX(BUFSIZE),\n    b = XAFTERX(BUFSIZE);\n", {
  "type": "Program",
  "start": 0,
  "end": 154,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 104,
      "end": 154,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 108,
          "end": 9,
          "id": {
            "type": "Identifier",
            "start": 108,
            "end": 109,
            "name": "a"
          },
          "init": {
            "type": "Identifier",
            "start": 0,
            "end": 9,
            "name": "X_BUFSIZE"
          }
        },
        {
          "type": "VariableDeclarator",
          "start": 133,
          "end": 6,
          "id": {
            "type": "Identifier",
            "start": 133,
            "end": 134,
            "name": "b"
          },
          "init": {
            "type": "Identifier",
            "start": 0,
            "end": 6,
            "name": "X_1024"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {
  preprocess: true
});

test("#define foo  (a,b)\n#define bar(x) lose(x)\n#define lose(x) (1 + (x))\nbar(foo);\n", {
  "type": "Program",
  "start": 0,
  "end": 77,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 58,
      "end": 77,
      "expression": {
        "type": "BinaryExpression",
        "start": 58,
        "end": 67,
        "left": {
          "type": "Literal",
          "start": 59,
          "end": 60,
          "value": 1,
          "raw": "1"
        },
        "operator": "+",
        "right": {
          "type": "SequenceExpression",
          "start": 63,
          "end": 66,
          "expressions": [
            {
              "type": "Identifier",
              "start": 14,
              "end": 15,
              "name": "a"
            },
            {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "b"
            }
          ]
        }
      }
    }
  ]
}, {
  preprocess: true
});

test("#define lose(x) (1 + (x))\n#define foo  a,b\n#define bar(x) lose((x))\nbar(foo);\n", {
  "type": "Program",
  "start": 0,
  "end": 77,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 16,
      "end": 77,
      "expression": {
        "type": "BinaryExpression",
        "start": 16,
        "end": 25,
        "left": {
          "type": "Literal",
          "start": 17,
          "end": 18,
          "value": 1,
          "raw": "1"
        },
        "operator": "+",
        "right": {
          "type": "SequenceExpression",
          "start": 21,
          "end": 24,
          "expressions": [
            {
              "type": "Identifier",
              "start": 39,
              "end": 40,
              "name": "a"
            },
            {
              "type": "Identifier",
              "start": 41,
              "end": 42,
              "name": "b"
            }
          ]
        }
      }
    }
  ]
}, {
  preprocess: true
});

// Failure tests

testFail("{",
         "Unexpected token (1:1)");

testFail("}",
         "Unexpected token (1:0)");

testFail("3ea",
         "Invalid number (1:0)");

testFail("3in []",
         "Identifier directly after number (1:1)");

testFail("3e",
         "Invalid number (1:0)");

testFail("3e+",
         "Invalid number (1:0)");

testFail("3e-",
         "Invalid number (1:0)");

testFail("3x",
         "Identifier directly after number (1:1)");

testFail("3x0",
         "Identifier directly after number (1:1)");

testFail("0x",
         "Expected hexadecimal number (1:2)");

testFail("09",
         "Invalid number (1:0)");

testFail("018",
         "Invalid number (1:0)");

testFail("01a",
         "Identifier directly after number (1:2)");

testFail("3in[]",
         "Identifier directly after number (1:1)");

testFail("0x3in[]",
         "Identifier directly after number (1:3)");

testFail("\"Hello\nWorld\"",
         "Unterminated string constant (1:0)");

testFail("x\\",
         "Expecting Unicode escape sequence \\uXXXX (1:2)");

testFail("x\\u005c",
         "Invalid Unicode escape (1:3)");

testFail("x\\u002a",
         "Invalid Unicode escape (1:3)");

testFail("/",
         "Unterminated regular expression (1:1)");

testFail("/test",
         "Unterminated regular expression (1:1)");

testFail("var x = /[a-z]/\\ux",
         "Bad character escape sequence (1:8)");

testFail("3 = 4",
         "Assigning to rvalue (1:0)");

testFail("func() = 4",
         "Assigning to rvalue (1:0)");

testFail("(1 + 1) = 10",
         "Assigning to rvalue (1:0)");

testFail("1++",
         "Assigning to rvalue (1:0)");

testFail("1--",
         "Assigning to rvalue (1:0)");

testFail("++1",
         "Assigning to rvalue (1:2)");

testFail("--1",
         "Assigning to rvalue (1:2)");

testFail("for((1 + 1) in list) process(x);",
         "Assigning to rvalue (1:4)");

testFail("[",
         "Unexpected token (1:1)");

testFail("[,",
         "Unexpected token (1:2)");

testFail("1 + {",
         "Unexpected token (1:5)");

testFail("1 + { t:t ",
         "Expected ',' in object literal (1:10)");

testFail("1 + { t:t,",
         "Unexpected token (1:10)");

testFail("var x = /\n/",
         "Unterminated regular expression (1:9)");

testFail("var x = \"\n",
         "Unterminated string constant (1:8)");

testFail("var if = 42",
         "Unexpected token (1:4)");

testFail("i + 2 = 42",
         "Assigning to rvalue (1:0)");

testFail("+i = 42",
         "Assigning to rvalue (1:0)");

testFail("1 + (",
         "Unexpected token (1:5)");

testFail("\n\n\n{",
         "Unexpected token (4:1)");

testFail("\n/* Some multiline\ncomment */\n)",
         "Unexpected token (4:0)");

testFail("{ set 1 }",
         "Expected a semicolon (1:6)");

testFail("{ get 2 }",
         "Expected a semicolon (1:6)");

testFail("({ set: s(if) { } })",
         "Unexpected token (1:10)");

testFail("({ set s(.) { } })",
         "Unexpected token (1:9)");

testFail("({ set: s() { } })",
         "Expected ',' in object literal (1:12)");

testFail("({ set: s(a, b) { } })",
         "Expected ',' in object literal (1:16)");

testFail("({ get: g(d) { } })",
         "Expected ',' in object literal (1:13)");

testFail("({ get i() { }, i: 42 })",
         "Redefinition of property (1:16)");

testFail("({ i: 42, get i() { } })",
         "Redefinition of property (1:14)");

testFail("({ set i(x) { }, i: 42 })",
         "Redefinition of property (1:17)");

testFail("({ i: 42, set i(x) { } })",
         "Redefinition of property (1:14)");

testFail("({ get i() { }, get i() { } })",
         "Redefinition of property (1:20)");

testFail("({ set i(x) { }, set i(x) { } })",
         "Redefinition of property (1:21)");

testFail("function t(if) { }",
         "Unexpected token (1:11)");

testFail("function t(true) { }",
         "Unexpected token (1:11)");

testFail("function t(false) { }",
         "Unexpected token (1:11)");

testFail("function t(null) { }",
         "Unexpected token (1:11)");

testFail("function null() { }",
         "Unexpected token (1:9)");

testFail("function true() { }",
         "Unexpected token (1:9)");

testFail("function false() { }",
         "Unexpected token (1:9)");

testFail("function if() { }",
         "Unexpected token (1:9)");

testFail("a b;",
         "Expected a semicolon (1:2)");

testFail("if.a;",
         "Expected '(' before expression (1:2)");

testFail("a if;",
         "Expected a semicolon (1:2)");

testFail("a class;",
         "Expected a semicolon (1:2)");

testFail("break\n",
         "Unsyntactic break (1:0)");

testFail("break 1;",
         "Unexpected token (1:6)");

testFail("continue\n",
         "Unsyntactic continue (1:0)");

testFail("continue 2;",
         "Unexpected token (1:9)");

testFail("throw",
         "Unexpected token (1:5)");

testFail("throw;",
         "Unexpected token (1:5)");

testFail("for (var i, i2 in {});",
         "Expected ';' in for statement (1:15)");

testFail("for ((i in {}));",
         "Expected ';' in for statement (1:14)");

testFail("for (i + 1 in {});",
         "Assigning to rvalue (1:5)");

testFail("for (+i in {});",
         "Assigning to rvalue (1:5)");

testFail("if(false)",
         "Unexpected token (1:9)");

testFail("if(false) doThis(); else",
         "Unexpected token (1:24)");

testFail("do",
         "Unexpected token (1:2)");

testFail("while(false)",
         "Unexpected token (1:12)");

testFail("for(;;)",
         "Unexpected token (1:7)");

testFail("with(x)",
         "Unexpected token (1:7)");

testFail("try { }",
         "Missing catch or finally clause (1:0)");

testFail("‿ = 10",
         "Unexpected character '‿' (1:0)");

testFail("if(true) let a = 1;",
         "Expected a semicolon (1:13)");

testFail("switch (c) { default: default: }",
         "Multiple default clauses (1:22)");

testFail("new X().\"s\"",
         "Unexpected token (1:8)");

testFail("/*",
         "Unterminated comment (1:0)");

testFail("/*\n\n\n",
         "Unterminated comment (1:0)");

testFail("/**",
         "Unterminated comment (1:0)");

testFail("/*\n\n*",
         "Unterminated comment (1:0)");

testFail("/*hello",
         "Unterminated comment (1:0)");

testFail("/*hello  *",
         "Unterminated comment (1:0)");

testFail("\n]",
         "Unexpected token (2:0)");

testFail("\r]",
         "Unexpected token (2:0)");

testFail("\r\n]",
         "Unexpected token (2:0)");

testFail("\n\r]",
         "Unexpected token (3:0)");

testFail("//\r\n]",
         "Unexpected token (2:0)");

testFail("//\n\r]",
         "Unexpected token (3:0)");

testFail("/a\\\n/",
         "Unterminated regular expression (1:1)");

testFail("//\r \n]",
         "Unexpected token (3:0)");

testFail("/*\r\n*/]",
         "Unexpected token (2:2)");

testFail("/*\n\r*/]",
         "Unexpected token (3:2)");

testFail("/*\r \n*/]",
         "Unexpected token (3:2)");

testFail("\\\\",
         "Expecting Unicode escape sequence \\uXXXX (1:1)");

testFail("\\u005c",
         "Invalid Unicode escape (1:2)");

testFail("\\x",
         "Expecting Unicode escape sequence \\uXXXX (1:1)");

testFail("\\u0000",
         "Invalid Unicode escape (1:2)");

testFail("‌ = []",
         "Unexpected character '‌' (1:0)");

testFail("‍ = []",
         "Unexpected character '‍' (1:0)");

testFail("\"\\",
         "Unterminated string constant (1:0)");

testFail("\"\\u",
         "Bad character escape sequence (1:0)");

testFail("return",
         "'return' outside of function (1:0)");

testFail("break",
         "Unsyntactic break (1:0)");

testFail("continue",
         "Unsyntactic continue (1:0)");

testFail("switch (x) { default: continue; }",
         "Unsyntactic continue (1:22)");

testFail("do { x } *",
         "Expected 'while' at end of do statement (1:9)");

testFail("while (true) { break x; }",
         "Unsyntactic break (1:15)");

testFail("while (true) { continue x; }",
         "Unsyntactic continue (1:15)");

testFail("x: while (true) { (function () { break x; }); }",
         "Unsyntactic break (1:33)");

testFail("x: while (true) { (function () { continue x; }); }",
         "Unsyntactic continue (1:33)");

testFail("x: while (true) { (function () { break; }); }",
         "Unsyntactic break (1:33)");

testFail("x: while (true) { (function () { continue; }); }",
         "Unsyntactic continue (1:33)");

testFail("x: while (true) { x: while (true) { } }",
         "Label 'x' is already declared (1:18)");

testFail("(function () { 'use strict'; delete i; }())",
         "Deleting local variable in strict mode (1:29)");

testFail("(function () { 'use strict'; with (i); }())",
         "'with' in strict mode (1:29)");

testFail("function hello() {'use strict'; ({ i: 42, i: 42 }) }",
         "Redefinition of property (1:42)");

testFail("function hello() {'use strict'; ({ hasOwnProperty: 42, hasOwnProperty: 42 }) }",
         "Redefinition of property (1:55)");

testFail("function hello() {'use strict'; var eval = 10; }",
         "Binding eval in strict mode (1:36)");

testFail("function hello() {'use strict'; var arguments = 10; }",
         "Binding arguments in strict mode (1:36)");

testFail("function hello() {'use strict'; try { } catch (eval) { } }",
         "Binding eval in strict mode (1:47)");

testFail("function hello() {'use strict'; try { } catch (arguments) { } }",
         "Binding arguments in strict mode (1:47)");

testFail("function hello() {'use strict'; eval = 10; }",
         "Assigning to eval in strict mode (1:32)");

testFail("function hello() {'use strict'; arguments = 10; }",
         "Assigning to arguments in strict mode (1:32)");

testFail("function hello() {'use strict'; ++eval; }",
         "Assigning to eval in strict mode (1:34)");

testFail("function hello() {'use strict'; --eval; }",
         "Assigning to eval in strict mode (1:34)");

testFail("function hello() {'use strict'; ++arguments; }",
         "Assigning to arguments in strict mode (1:34)");

testFail("function hello() {'use strict'; --arguments; }",
         "Assigning to arguments in strict mode (1:34)");

testFail("function hello() {'use strict'; eval++; }",
         "Assigning to eval in strict mode (1:32)");

testFail("function hello() {'use strict'; eval--; }",
         "Assigning to eval in strict mode (1:32)");

testFail("function hello() {'use strict'; arguments++; }",
         "Assigning to arguments in strict mode (1:32)");

testFail("function hello() {'use strict'; arguments--; }",
         "Assigning to arguments in strict mode (1:32)");

testFail("function hello() {'use strict'; function eval() { } }",
         "Defining 'eval' in strict mode (1:41)");

testFail("function hello() {'use strict'; function arguments() { } }",
         "Defining 'arguments' in strict mode (1:41)");

testFail("function eval() {'use strict'; }",
         "Defining 'eval' in strict mode (1:9)");

testFail("function arguments() {'use strict'; }",
         "Defining 'arguments' in strict mode (1:9)");

testFail("function hello() {'use strict'; (function eval() { }()) }",
         "Defining 'eval' in strict mode (1:42)");

testFail("function hello() {'use strict'; (function arguments() { }()) }",
         "Defining 'arguments' in strict mode (1:42)");

testFail("(function eval() {'use strict'; })()",
         "Defining 'eval' in strict mode (1:10)");

testFail("(function arguments() {'use strict'; })()",
         "Defining 'arguments' in strict mode (1:10)");

testFail("function hello() {'use strict'; ({ s: function eval() { } }); }",
         "Defining 'eval' in strict mode (1:47)");

testFail("(function package() {'use strict'; })()",
         "Defining 'package' in strict mode (1:10)");

testFail("function hello() {'use strict'; ({ i: 10, set s(eval) { } }); }",
         "Defining 'eval' in strict mode (1:48)");

testFail("function hello() {'use strict'; ({ set s(eval) { } }); }",
         "Defining 'eval' in strict mode (1:41)");

testFail("function hello() {'use strict'; ({ s: function s(eval) { } }); }",
         "Defining 'eval' in strict mode (1:49)");

testFail("function hello(eval) {'use strict';}",
         "Defining 'eval' in strict mode (1:15)");

testFail("function hello(arguments) {'use strict';}",
         "Defining 'arguments' in strict mode (1:15)");

testFail("function hello() { 'use strict'; function inner(eval) {} }",
         "Defining 'eval' in strict mode (1:48)");

testFail("function hello() { 'use strict'; function inner(arguments) {} }",
         "Defining 'arguments' in strict mode (1:48)");

testFail("function hello() { 'use strict'; \"\\1\"; }",
         "Octal literal in strict mode (1:34)");

testFail("function hello() { 'use strict'; 021; }",
         "Invalid number (1:33)");

testFail("function hello() { 'use strict'; ({ \"\\1\": 42 }); }",
         "Octal literal in strict mode (1:37)");

testFail("function hello() { 'use strict'; ({ 021: 42 }); }",
         "Invalid number (1:36)");

testFail("function hello() { \"use strict\"; function inner() { \"octal directive\\1\"; } }",
         "Octal literal in strict mode (1:68)");

testFail("function hello() { \"use strict\"; var implements; }",
         "The keyword 'implements' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var interface; }",
         "The keyword 'interface' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var package; }",
         "The keyword 'package' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var private; }",
         "The keyword 'private' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var protected; }",
         "The keyword 'protected' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var public; }",
         "The keyword 'public' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var static; }",
         "The keyword 'static' is reserved (1:37)");

testFail("function hello(static) { \"use strict\"; }",
         "Defining 'static' in strict mode (1:15)");

testFail("function static() { \"use strict\"; }",
         "Defining 'static' in strict mode (1:9)");

testFail("\"use strict\"; function static() { }",
         "The keyword 'static' is reserved (1:23)");

testFail("function a(t, t) { \"use strict\"; }",
         "Argument name clash in strict mode (1:14)");

testFail("function a(eval) { \"use strict\"; }",
         "Defining 'eval' in strict mode (1:11)");

testFail("function a(package) { \"use strict\"; }",
         "Defining 'package' in strict mode (1:11)");

testFail("function a() { \"use strict\"; function b(t, t) { }; }",
         "Argument name clash in strict mode (1:43)");

testFail("(function a(t, t) { \"use strict\"; })",
         "Argument name clash in strict mode (1:15)");

testFail("function a() { \"use strict\"; (function b(t, t) { }); }",
         "Argument name clash in strict mode (1:44)");

testFail("(function a(eval) { \"use strict\"; })",
         "Defining 'eval' in strict mode (1:12)");

testFail("(function a(package) { \"use strict\"; })",
         "Defining 'package' in strict mode (1:12)");

testFail("var this = 10;", "Unexpected token (1:4)");

testFail("throw\n10;", "Illegal newline after throw (1:5)");

// Assertion Tests
(function() {
  var actualComments = [],
      expectedComments = [
        " Bear class",
        " Whatever",
        [" 1",
         "         2",
         "         3"
        ].join('\n'),
        "stuff"
      ];
  testAssert(
    function TestComments() {
      // Bear class
      function Bear(x,y,z) {
        this.position = [x||0,y||0,z||0]
      }

      Bear.prototype.roar = function(message) {
        return 'RAWWW: ' + message; // Whatever
      };

      function Cat() {
      /* 1
         2
         3*/
      }

      Cat.prototype.roar = function(message) {
        return 'MEOOWW: ' + /*stuff*/ message;
      };
    }.toString(),
    function assert(ast) {
      if (actualComments.length !== expectedComments.length) {
        return JSON.stringify(actualComments) + " !== " + JSON.stringify(expectedComments);
      } else {
        for (var i=0, n=actualComments.length; i < n; i++) {
          if (actualComments[i] !== expectedComments[i])
            return JSON.stringify(actualComments[i]) + ' !== ' + JSON.stringify(expectedComments[i]);
        }
      }
    },
    {
      onComment: function(isMultiline, text) {
        actualComments.push(text);
      }
    }
  );
})();
