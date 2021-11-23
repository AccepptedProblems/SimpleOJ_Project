#include <bits/stdc++.h>

using namespace std;

const int N = 100010;

char s[N];

void upperTurn(char &u) {
  if (u >= 'A' && u <= 'Z') {
    return;
  }
  u += 'A' - 'a';
}

void lowerTurn(char &u) {
  if (u >= 'a' && u <= 'z') {
    return;
  }
  u += 'a' - 'A';
}

int main() {
  freopen("inp.txt", "r" ,stdin);
  freopen("out.txt", "w", stdout);
  while (cin >> (s + 1)) {
    int n = strlen(s + 1);
    upperTurn(s[1]);
    for (int i = 2; i <= n; i++) {
      lowerTurn(s[i]);
    }
    printf("%s ", s + 1);
  }
  return 0;
}
