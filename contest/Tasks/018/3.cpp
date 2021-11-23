#include <bits/stdc++.h>

using namespace std;

char s[100];
int n;

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%s", s + 1);
  n = strlen(s + 1);
  s[++n] = '$';
  long long sum = 0, cur = 0;
  for (int i = 1; i <= n; i++) {
    if (s[i] < '0' || s[i] > '9') {
      sum += cur;
      cur = 0;
    } else {
      cur = cur * 10 + s[i] - '0';
    }
  }
  cout << sum << endl;
  return 0;
}
