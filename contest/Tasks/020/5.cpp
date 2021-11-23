#include <bits/stdc++.h>

using namespace std;

const int N = 1010;

char x[N], y[N];
int nx, ny;

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%s %s", x + 1, y + 1);
  nx = strlen(x + 1);
  ny = strlen(y + 1);
  int cur = 1;
  int f = 0;
  for (int i = 1; i <= nx; i++) {
    while (cur <= ny && y[cur] != x[i]) {
      cur++;
    }
    if (y[cur] == x[i]) {
      cur++;
      continue;
    }
    puts("NO");
    return 0;
  }
  puts("YES");
  return 0;
}


